import { Button, Card, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { ItemCount } from '../ItemCount/ItemCount';

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
	let ref;

	if (tipo === 'CPU' || tipo === 'Motherboard') {
		socketOption = socket[0];
		ref = 'Socket: ';
	} else if (tipo === 'RAM') {
		socketOption = socket[1];
		ref = 'Memoria: ';
	}

	return (
		<Box>
			<Card
				key={id}
				sx={{
					width: '250px',
					maxHeight: '650px',
				}}
			>
				{/* <CardMedia
					component="img"
					width="250px"
					height="250px"
					image={require(`../../data/img/${imagen}`).default}
					alt={imagen}
				/> */}
				<Typography variant="h5" color="initial">
					{tipo + ' ' + marca + ' ' + serie}
				</Typography>
				<Typography variant="body2">
					{ref}
					{socketOption}
				</Typography>
				<Typography variant="h5" color="initial">
					USD${precio}
				</Typography>

				<ItemCount precio={precio} />

				<Button
					sx={{ margin: '1rem' }}
					variant="contained"
					color="success"
				>
					Agregar al Carrito
				</Button>
			</Card>
		</Box>
	);
};
