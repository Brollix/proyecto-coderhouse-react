import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { Typography, Paper } from '@mui/material';

export const Checkout = () => {
	const { cart, totalCompra } = useContext(CartContext);

	const [values, setValues] = useState({
		nombre: '',
		email: '',
		telefono: '',
	});

	const handleInputChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const orden = {
			buyer: {
				...values,
			},
			items: cart,
			total: totalCompra(),
		};
		console.log(orden);
	};

	return (
		<Paper>
			<Typography variant="h3" color="primary">
				Resumen de Compra
			</Typography>
			<Typography variant="body1" color="initial"></Typography>
			<form onSubmit={handleSubmit}>
				<input
					onChange={handleInputChange}
					name="nombre"
					value={values.nombre}
					type="text"
					placeholder="Nombre"
				/>

				<input
					onChange={handleInputChange}
					name="email"
					value={values.email}
					type="text"
					placeholder="Email"
				/>

				<input
					onChange={handleInputChange}
					name="telefono"
					value={values.telefono}
					type="number"
					placeholder="telefono"
				/>

				<button type="submit">Enviar</button>
			</form>
		</Paper>
	);
};
