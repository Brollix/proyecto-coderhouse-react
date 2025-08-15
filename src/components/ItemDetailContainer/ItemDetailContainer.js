import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../../supabase/config'
import { ItemDetail } from '../ItemDetail/ItemDetail'

export const ItemDetailContainer = () => {
	const [item, setItem] = useState()
	const [loading, setLoading] = useState(false)

	const { itemID } = useParams()

	useEffect(() => {
		setLoading(true)

		const fetchItem = async () => {
			let data = null
			let error = null
			try {
				const isNumeric = !isNaN(Number(itemID))
				if (isNumeric) {
					// Prefer buscar por legacy_id cuando la URL es numérica
					const res = await supabase
						.from('stock')
						.select('*')
						.eq('legacy_id', Number(itemID))
						.single()
					data = res.data
					error = res.error
				} else {
					const res = await supabase
						.from('stock')
						.select('*')
						.eq('id', itemID)
						.single()
					data = res.data
					error = res.error
				}
				console.log('Supabase item response', { data, error })
				if (error || !data) {
					console.error('Item no encontrado en Supabase:', itemID, error)
					setItem(undefined)
				} else {
					setItem(data)
				}
			} catch (e) {
				console.error('Unexpected error fetching item:', e)
			} finally {
				setLoading(false)
			}
		}

		fetchItem()
	}, [itemID])

	return (
		<>
			{loading ? (
				<div>
					<i className="fas fa-spinner fa-spin"></i>
				</div>
			) : (
				<div className="detail-container">
					<ItemDetail {...item} />
				</div>
			)}
		</>
	)
}
