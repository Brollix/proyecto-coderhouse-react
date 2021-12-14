import { Typography, Button, Card, ButtonGroup, Paper } from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './CartView.css';

export const CartView = () => {
	const { cart, emptyCart, removeFromCart, totalCompra } =
		useContext(CartContext);

	return (
		<>
			<Card>
				{cart.map((prod) => {
					return (
						<Paper key={prod.id}>
							<Typography>{prod.marca}</Typography>
							<Typography>{prod.serie}</Typography>
							<Typography>Total: ${totalCompra()}</Typography>
							<Button
								onClick={() => {
									removeFromCart(prod.id);
								}}
								variant="text"
								color="primary"
							>
								Eliminar
							</Button>
						</Paper>
					);
				})}
			</Card>
			{cart.length > 0 ? (
				<ButtonGroup variant="text" color="primary" aria-label="">
					<Button
						variant="contained"
						color="error"
						onClick={emptyCart}
					>
						Vaciar Carrito
					</Button>
					<Button variant="contained" color="success">
						<Link to="/checkout">Terminar mi Compra</Link>
					</Button>
				</ButtonGroup>
			) : (
				<Button variant="contained" color="error">
					<Link to="/">Volver al Inicio</Link>
				</Button>
			)}
		</>
	);
};
