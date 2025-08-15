import React, { useContext, useState } from 'react'
import { ItemCount } from '../ItemCount/ItemCount'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'
import { getImageUrl } from '../../supabase/storage'
import './ItemDetail.css'

export const ItemDetail = ({
	id,
	tipo,
	marca,
	serie,
	socket,
	imagen,
	precio,
	stock,
}) => {
	const { addToCart } = useContext(CartContext)

	let socketOption
	let ref

	if (tipo === 'CPU' || tipo === 'Motherboard') {
		socketOption = socket[0]
		ref = 'socket: '
	} else if (tipo === 'RAM') {
		socketOption = socket[1]
		ref = 'memoria: '
	}

	const [cantidad, setCantidad] = useState(0)

	const handleAddToCart = () => {
		if (cantidad < stock && cantidad > 0) {
			addToCart({
				id,
				tipo,
				marca,
				serie,
				socket,
				imagen,
				precio,
				cantidad,
				stock,
			})
		}
	}

	const imgSrc = getImageUrl(imagen)

	return (
		<div className="detail" key={id}>
			<div className="col image-col">
				<img src={imgSrc} alt={imagen} />
			</div>
			<div className="col info-col">				
				<h1>{tipo}</h1>
				<h2>{marca} {serie}</h2>
				<p>
					{ref}
					{socketOption}
				</p>
				<h4>stock: {stock}</h4>
				<h2>usd${precio}</h2>
			</div>
			<div className="col actions-col">
				<ItemCount
					precio={precio}
					cantidad={cantidad}
					setCantidad={setCantidad}
				/>
				<Link to="/cart">
					<button className="btn-add" onClick={handleAddToCart}>
						agregar al carrito
					</button>
				</Link>
				<Link to="/productos">
					<button className="btn-secondary">volver al inicio</button>
				</Link>
			</div>
		</div>
	)
}
