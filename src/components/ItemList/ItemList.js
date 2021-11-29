import React from 'react';
import {
	Card,
	CardMedia,
	Grid,
	Typography,
	ButtonGroup,
	Button,
} from '@mui/material';

export const ItemList = ({ productos }) => {
	return (
		<div>
			<h2>Productos:</h2>
			<h2>CPU, Motherboard y RAM</h2>
			<br />
			<Grid container>
				{productos.map((prod) => {
					let socket = '';
					if (prod.Tipo === 'CPU' || prod.Tipo === 'Motherboard') {
						socket = prod.Socket[0];
					} else if (prod.Tipo === 'RAM') {
						socket = prod.Socket[1];
					}
					return (
						<Card
							key={prod.id}
							sx={{
								width: '250px',
								maxHeight: '450px',
							}}
						>
							<CardMedia
								component="img"
								width="250px"
								height="250px"
								image={
									require(`../../data/img/${prod.Imagen}`)
										.default
								}
								alt={prod.Imagen}
							/>
							<Typography variant="body1" color="initial">
								{prod.Tipo + ' ' + prod.Marca}
							</Typography>
							<Typography variant="body2">
								Modelo: {prod.Serie}
							</Typography>
							<Typography variant="body2">
								Socket: {socket}
							</Typography>
							<Typography variant="h5" color="initial">
								USD${prod.Precio}
							</Typography>

							<ButtonGroup color="primary" aria-label="">
								<Button variant="contained" color="primary">
									Agregar
								</Button>
								<Button color="info">Ver Mas</Button>
							</ButtonGroup>
						</Card>
					);
				})}
			</Grid>
		</div>
	);
};
