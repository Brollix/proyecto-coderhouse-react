import { Button, Card, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export const Item = ({ id, tipo, marca, serie, socket, imagen, precio }) => {
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
					image={imagen}
					alt={imagen}
				/>
				<Typography variant="body1" color="initial">
					{tipo + ' ' + marca}
				</Typography>
				<Typography variant="body2">Modelo: {serie}</Typography>
				<Typography variant="body2">Socket: {socket}</Typography>
				<Typography variant="h5" color="initial">
					USD${precio}
				</Typography>

				<Button variant="contained" color="primary">
					<Link
						to={`/detail/${id}`}
						style={{
							color: 'white',
							textDecoration: 'none',
						}}
					>
						Ver Más
					</Link>
				</Button>
			</Card>
		</>
	);
};
