import React, { useContext } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { CartContext } from '../../context/CartContext'
import './CartWidget.css'

export const CartWidget = () => {
	const { totalCantidad } = useContext(CartContext)
	return (
		<div className="cart-icon">
			<span className="cant">{totalCantidad()}</span>
			<ShoppingCartIcon className="cart" />
		</div>
	)
}
