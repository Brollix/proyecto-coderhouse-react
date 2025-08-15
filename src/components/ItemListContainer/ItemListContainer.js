import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ItemList } from '../ItemList/ItemList'
import { useParams, useLocation } from 'react-router-dom'
import { supabase } from '../../supabase/config'
import './ItemListContainer.css'
import { useBuild } from '../../context/BuildContext'
import { useDollarRate } from '../../hooks/useDollarRate'

// Función para verificar compatibilidad
const isCompatible = (item, build) => {
  if (item.tipo === 'Motherboard' && build.CPU) {
    return build.CPU.socket === item.socket
  }
  if (item.tipo === 'RAM' && build.Motherboard) {
    return build.Motherboard.memoria === item.memoria
  }
  if (item.tipo === 'CPU' && build.Motherboard) {
    return build.Motherboard.socket === item.socket
  }
  return true // Por defecto es compatible si no hay con qué comparar
}

export const ItemListContainer = () => {
	const [productos, setProductos] = useState([])
	const [loading, setLoading] = useState(false)
	const { rate: usdArsRate } = useDollarRate()
	const { typeID } = useParams()
	const location = useLocation()
	const searchParams = new URLSearchParams(location.search)
	const marca = searchParams.get('marca')
    const socketQ = searchParams.get('socket')
    const memQ = searchParams.get('mem')
	const { build, clearBuild, removePart } = useBuild()
	const buildParts = Object.values(build)

    // If we're in RAM listing and there's a Motherboard selected, derive compatible mem type (e.g., DDR4/DDR5)
    const mobo = build['Motherboard']
    const memFromBuild = React.useMemo(() => {
        if (!mobo) return null
        return typeof mobo.memoria === 'string' ? mobo.memoria : null
    }, [mobo])
    const effectiveMem = typeID === 'RAM' ? (memQ || memFromBuild) : memQ

	useEffect(() => {
		setLoading(true)

		const fetchProductos = async () => {
            const noFilters = !typeID && !marca && !socketQ && !memQ
            if (noFilters) {
                // Hotfix for RLS/policies: fetch per 'tipo' and merge
                const tipos = ['CPU', 'Motherboard', 'RAM']
                const results = await Promise.all(
                    tipos.map(t =>
                        supabase
                            .from('stock')
                            .select('*')
                            .eq('tipo', t)
                            .order('id', { ascending: true })
                            .limit(50)
                    )
                )
                const merged = results
                    .map(r => (Array.isArray(r.data) ? r.data : []))
                    .flat()
                    .sort((a, b) => {
                        const am = (a.marca || '').toString()
                        const bm = (b.marca || '').toString()
                        const byMarca = am.localeCompare(bm, 'es', { sensitivity: 'base' })
                        if (byMarca !== 0) return byMarca
                        const as = (a.serie || '').toString()
                        const bs = (b.serie || '').toString()
                        return as.localeCompare(bs, 'es', { sensitivity: 'base' })
                    })
                console.log('typeID:', typeID, 'effectiveMem:', effectiveMem)
                console.log('Supabase productos (per tipo) total length:', merged.length)
                setProductos(merged)
                setLoading(false)
                return
            }

            // Build filtered query
            let query = supabase.from('stock').select('*')
            if (typeID) {
                query = query.eq('tipo', typeID)
            }
            if (marca && typeID && typeID !== 'RAM') {
                query = query.eq('marca', marca)
            }
            if (socketQ && typeID !== 'RAM') {
                query = query.eq('socket', socketQ)
            }
            if (typeID === 'RAM' && effectiveMem) {
                query = query.ilike('memoria', effectiveMem)
            }
            query = query
                .order('marca', { ascending: true })
                .order('serie', { ascending: true })
            const { data, error } = await query
            console.log('typeID:', typeID, 'effectiveMem:', effectiveMem)
            console.log('Supabase productos response data length:', data?.length || 0)
            console.log('Supabase productos response error:', error || null)
            if (Array.isArray(data)) {
                setProductos(data)
                setLoading(false)
                return
            }
            if (error) {				
                console.error('Error fetching productos:', error)
            }
            setLoading(false)
        }

		fetchProductos()
	}, [typeID, location.search])

	return loading ? (
		<div className="icon-container">
			<div className="spinner"></div>
		</div>
	) : (
		<>
			{buildParts.length > 0 && (
				<div className="build-mini">
					<div className="build-mini-left">
						<span className="header-title">armado actual</span>
						<div className="chips">
							{buildParts.map((p) => (
								<span key={p.tipo} className="filter-chip" title={`${p.marca} ${p.serie}`}>
									{p.tipo}: {p.marca} {p.serie}
									<button className="chip-x" onClick={() => removePart(p.tipo)}>×</button>
								</span>
							))}
						</div>
					</div>
					<div className="build-mini-actions">
						<Link to="/armado" className="btn-add">ver armado</Link>
						<button className="btn-secondary" onClick={clearBuild}>vaciar</button>
					</div>
				</div>
			)}
			{(marca || typeID) && (
				<div className="products-header">
					<span className="header-title">estás eligiendo</span>
					<div className="chips">
						{typeID && <span className="filter-chip">tipo: {typeID}</span>}
						{marca && <span className="filter-chip">marca: {marca}</span>}
                        {socketQ && <span className="filter-chip">socket: {socketQ}</span>}
                        {effectiveMem && <span className="filter-chip">mem: {effectiveMem}</span>}
					</div>
					<Link to="/productos" className="clear-filters">limpiar filtros</Link>
				</div>
			)}
			{productos.length === 0 ? (
				<div className="icon-container">
					<p>no hay productos para mostrar.</p>
				</div>
			) : (
				<ItemList 
					productos={[...productos].sort((a, b) => {
						const aCompatible = isCompatible(a, build);
						const bCompatible = isCompatible(b, build);
						// Compatibles first, then by name
						if (aCompatible && !bCompatible) return -1;
						if (!aCompatible && bCompatible) return 1;
						// If same compatibility, sort by name
						const aName = `${a.marca || ''} ${a.serie || ''}`.toLowerCase();
						const bName = `${b.marca || ''} ${b.serie || ''}`.toLowerCase();
						return aName.localeCompare(bName);
					})} 
					usdArsRate={usdArsRate} 
					build={build}
					isCompatible={isCompatible}
				/>
			)}
		</>
	)
}
