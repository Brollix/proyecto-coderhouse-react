import React, { useEffect, useState } from 'react';
import { fetchData } from '../../helpers/fetchData';
import {
	Card,
	CardMedia,
	CircularProgress,
	Typography,
	ButtonGroup,
	Button,
} from '@mui/material';
import { Box } from '@mui/system';

export const ItemDetailContainer = () => {
	const [loading, setLoading] = useState(false);
	const [productos, setProductos] = useState([]);
	const [id, setId] = useState(0);

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
	}, [productos]);

	const handleAnterior = () => {
		if (index > 0) {
			setIndex(index - 1);
			console.log(index);
		}
	};
	const handleProximo = () => {
		if (index < productos.length) {
			setIndex(index + 1);
			console.log(index);
		}
	};

	for (let i = 0; i < productos.length; i++) {
		productos[i].id = i;
	}

	return loading ? (
		<Box sx={{ display: 'flex', padding: '1rem' }}>
			<CircularProgress />
		</Box>
	) : (
		productos.map((prod) => {
			console.log(prod);
			return (
				<Card key={prod.id}>
					<CardMedia
						sx={{ maxWidth: 150 }}
						component="img"
						image={require(`../../data/img/${prod.Imagen}`).default}
						alt={prod.Imagen}
					/>
					<Typography variant="body1" color="initial">
						{prod[index].Serie}
					</Typography>
					<ButtonGroup variant="contained" color="primary">
						<Button onClick={handleAnterior}>Anterior</Button>
						<Button onClick={handleProximo}>Próximo</Button>
					</ButtonGroup>
				</Card>
			);
		})
	);
};
