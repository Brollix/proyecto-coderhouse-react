import { Paper, Typography, Button } from '@mui/material';
import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './CartView.css';

export const CartView = () => {
	const { cart, emptyCart } = useContext(CartContext);

	return (
		<Paper>
			{cart.map((prod) => {
				return <Typography>{prod.serie}</Typography>;
			})}
			<Button variant="text" color="error" onClick={emptyCart}>
				Vaciar Carrito
			</Button>
		</Paper>
	);
};
