import { Typography, Button, Card } from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './CartView.css';

export const CartView = () => {
	const { cart, emptyCart, removeFromCart } = useContext(CartContext);

	return (
		<>
			<Card>
				{cart.map((prod) => {
					return (
						<>
							<Typography>{prod.marca}</Typography>
							<Typography>{prod.serie}</Typography>
							{/* <Button variant="text" color="primary">
								Eliminar
							</Button> */}
						</>
					);
				})}
			</Card>
			{cart.length > 0 ? (
				<Button variant="contained" color="error" onClick={emptyCart}>
					Vaciar Carrito
				</Button>
			) : (
				<Button variant="text" color="primary">
					<Link to="/">Volver al Inicio</Link>
				</Button>
			)}
		</>
	);
};
