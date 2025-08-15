import React from 'react'
import './ItemCount.css'

export const ItemCount = ({ precio, cantidad, setCantidad }) => {
	const handleClickAdd = () => {
		setCantidad(cantidad + 1)
	}

	const handleClickRemove = () => {
		if (cantidad > 0) {
			setCantidad(cantidad - 1)
		}
	}

	const handleClickEmpty = () => {
		if (cantidad > 0) {
			setCantidad(cantidad - cantidad)
		}
	}

	return (
		<div>
			<p>cantidad: {cantidad}</p>
			<p>subtotal usd$ {cantidad * precio}</p>

			<div className="btn-group">
				<button onClick={handleClickRemove}>-</button>
				<button onClick={handleClickEmpty}>vaciar</button>
				<button onClick={handleClickAdd}>+</button>
			</div>
		</div>
	)
}
