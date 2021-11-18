import React, { useEffect, useState } from 'react';
import { fetchData } from '../../helpers/fetchData';
import Card from '@mui/material/Card';
import { CardMedia, CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';

export const ItemListContainer = () => {
	const [loading, setLoading] = useState(false);
	const [productos, setProductos] = useState([]);

	useEffect(() => {
		setLoading(true);
		fetchData()
			.then((resp) => {
				setProductos(resp);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	for (let i = 0; i < productos.length; i++) {
		productos[i].id = i;
	}

	return (
		<>
			{loading ? (
				<Box sx={{ display: 'flex' }}>
					<CircularProgress />
				</Box>
			) : (
				productos.map((prod) => (
					<Card key={prod.id} sx={{ width: 250, height: 250 }}>
						<CardMedia
							image="../../data/img/i3.png"
							height="140"
							alt={(prod.Marca, prod.Serie)}
						/>
						<Typography
							gutterBottom
							variant="h4"
							color="initial"
							component="div"
						>
							{(prod.Marca, prod.Serie)}
						</Typography>
						<Typography variant="body1" color="initial">
							USD${prod.Precio}
						</Typography>
					</Card>
				))
			)}
		</>
	);
};
