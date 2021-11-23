import React, { useEffect, useState } from 'react';
import { fetchData } from '../../helpers/fetchData';
import Card from '@mui/material/Card';
import { CardMedia, Typography } from '@mui/material';
import { Button, ButtonGroup } from '@mui/material';

export const ItemDetailContainer = () => {
	const [productos, setProductos] = useState([]);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		fetchData()
			.then((resp) => {
				setProductos(resp);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleAnterior = () => {
		if (index > 0) {
			setIndex(index - 1);
		}
	};
	const handleSiguiente = () => {
		if (index < productos.length()) {
			setIndex(index + 1);
		}
	};

	return (
		<div>
			<Card key={productos[index].id} className="card">
				<CardMedia
					className="media"
					component="img"
					image={
						require(`../../data/img/${productos[index].Imagen}`)
							.default
					}
					alt={productos[index].Imagen}
				/>
				<Typography variant="body2" color="initial">
					{productos[index].Tipo}
				</Typography>
				<Typography
					gutterBottom
					variant="h4"
					color="initial"
					component="div"
				>
					{productos[index].Marca + ' ' + productos[index].Serie}
				</Typography>
				<Typography variant="body1" color="initial">
					USD${productos[index].Precio}
				</Typography>

				<ButtonGroup variant="contained" color="primary" aria-label="">
					<Button onClick={handleAnterior}> Anterior </Button>
					<Button onClick={handleSiguiente}> Siguiente </Button>
				</ButtonGroup>
			</Card>
		</div>
	);
};
