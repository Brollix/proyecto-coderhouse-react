import React, { useContext, useState } from 'react'
import { ItemCount } from '../ItemCount/ItemCount'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'
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
		ref = 'Socket: '
	} else if (tipo === 'RAM') {
		socketOption = socket[1]
		ref = 'Memoria: '
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

	return (
		<div className="detail" key={id}>
			<img src={imagen} alt={imagen} />
			<h2>{tipo + ' ' + marca + ' ' + serie}</h2>
			<p>
				{ref}
				{socketOption}
			</p>
			<h3>USD${precio}</h3>
			<ItemCount
				precio={precio}
				cantidad={cantidad}
				setCantidad={setCantidad}
			/>

			<Link to="/cart">
				<button className="btn-add" onClick={handleAddToCart}>
					Agregar al Carrito
				</button>
			</Link>
			<Link to="/productos">
				<button>Volver al inicio</button>
			</Link>
		</div>
	)
}
