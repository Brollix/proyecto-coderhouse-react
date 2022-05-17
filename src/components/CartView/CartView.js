import { Typography, Button, Card, ButtonGroup, Paper } from '@mui/material'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import './CartView.css'

export const CartView = () => {
	const { cart, emptyCart, removeFromCart, totalCompra } =
		useContext(CartContext)

	return (
		<Card className="container">
			{cart.map((prod) => {
				return (
					<Paper key={prod.id}>
						<Typography>Marca: {prod.marca}</Typography>
						<Typography>Serie: {prod.serie}</Typography>
						<Typography>Total: USD${totalCompra()}</Typography>
						<Button
							onClick={() => {
								removeFromCart(prod.id)
							}}
							variant="text"
							color="primary"
						>
							Eliminar
						</Button>
					</Paper>
				)
			})}

			{cart.length > 0 ? (
				<ButtonGroup
					className="botones"
					variant="text"
					color="primary"
					aria-label=""
				>
					<Button
						className="botones"
						variant="contained"
						color="error"
						onClick={emptyCart}
					>
						Vaciar Carrito
					</Button>
					<Button
						className="botones"
						variant="contained"
						color="success"
					>
						<Link
							style={{ textDecoration: 'none', color: 'white' }}
							to="/checkout"
						>
							Terminar mi Compra
						</Link>
					</Button>
				</ButtonGroup>
			) : (
				<div>
					<Button variant="contained" color="error">
						<Link
							style={{
								textDecoration: 'none',
								color: 'white',
							}}
							to="/productos"
						>
							Volver al Inicio
						</Link>
					</Button>
				</div>
			)}
		</Card>
	)
}
