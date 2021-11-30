import { Button, Card, CardMedia, Typography } from '@mui/material';
import React from 'react';

export const ItemDetail = ({
	id,
	tipo,
	marca,
	serie,
	socket,
	imagen,
	precio,
}) => {
	let socketOption;

	if (tipo === 'CPU' || tipo === 'Motherboard') {
		socketOption = socket[0];
	} else if (tipo === 'RAM') {
		socketOption = socket[1];
	}

	console.log(id, tipo, marca, serie, socket, socket, imagen, precio);
	return (
		<>
			<Card
				key={id}
				sx={{
					width: '250px',
					maxHeight: '450px',
				}}
			>
				<CardMedia
					component="img"
					width="250px"
					height="250px"
					image={require(`../../data/img/${imagen}`).default}
					alt={imagen}
				/>
				<Typography variant="body1" color="initial">
					{tipo + ' ' + marca}
				</Typography>
				<Typography variant="body2">Modelo: {serie}</Typography>
				<Typography variant="body2">{socketOption}</Typography>
				<Typography variant="h5" color="initial">
					USD${precio}
				</Typography>

				<Button variant="contained" color="primary">
					Agregar
				</Button>
			</Card>
		</>
	);
};
