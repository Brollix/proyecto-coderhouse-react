import { Button, Card, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export const Item = ({
	id,
	tipo,
	marca,
	serie,
	socket,
	imagen,
	precio,
	stock,
}) => {
	let socketRef;
	if (tipo !== 'RAM') {
		socketRef = socket[0];
	} else socketRef = socket[1];

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
				<Typography variant="body2">Socket: {socketRef}</Typography>
				<Typography variant="h5">USD${precio}</Typography>
				<Typography variant="h6" color="initial">
					Stock: {stock}
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
