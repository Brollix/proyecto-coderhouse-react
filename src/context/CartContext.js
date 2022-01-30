import React from 'react'
import { createContext, useState } from 'react'
export const CartContext = createContext()

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([])

	const addToCart = (item) => {
		setCart([...cart, item])
	}

	const removeFromCart = (id) => {
		setCart(cart.filter((prod) => prod.id !== id))
	}

	const emptyCart = () => {
		if (cart.length > 0) {
			setCart([])
		}
	}

	const isInCart = (id) => {
		return cart.some((prod) => prod.id === id)
	}

	const totalCantidad = () => {
		return cart.reduce((acc, prod) => acc + prod.cantidad, 0)
	}

	const totalCompra = () => {
		return cart.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)
	}

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				emptyCart,
				isInCart,
				totalCantidad,
				totalCompra,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}
