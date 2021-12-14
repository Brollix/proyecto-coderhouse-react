import React, { useContext } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { CartContext } from '../../context/CartContext';
import { Typography, Paper } from '@mui/material';

export const Checkout = () => {
	const { cart, totalCompra } = useContext(CartContext);

	const orden = {
		buyer: {
			name: '',
			email: '',
			phone: 0,
		},
		items: cart,
		total: totalCompra(),
	};

	const handleEnviar = () => {
		console.log(orden);
	};

	return (
		<Paper>
			<Typography variant="h3" color="primary">
				Resumen de Compra
			</Typography>
			<Typography variant="body1" color="initial"></Typography>
			<ButtonGroup variant="contained" color="primary" aria-label="">
				<Button onClick={handleEnviar}>Enviar</Button>
			</ButtonGroup>
		</Paper>
	);
};
