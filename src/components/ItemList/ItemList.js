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
			<h2>Productos</h2>
			<br />
			<Grid container>
				{productos.map((prod) => {
					return (
						<Card
							key={prod.id}
							sx={{
								width: '250px',
								height: '375px',
							}}
						>
							<CardMedia
								component="img"
								image={
									require(`../../data/img/${prod.Imagen}`)
										.default
								}
								alt={prod.Imagen}
							/>
							<Typography variant="body1" color="initial">
								{prod.Marca + ' ' + prod.Serie}
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
