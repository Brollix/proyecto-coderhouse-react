import React, { useEffect, useState } from 'react';
import { fetchData } from '../../helpers/fetchData';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import './ItemListContainer.css';
import { ItemList } from '../ItemList/ItemList';

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
	}, [productos]);

	for (let i = 0; i < productos.length; i++) {
		productos[i].id = i;
	}

	return loading ? (
		<Box
			sx={{
				display: 'flex',
				padding: '1rem',
			}}
		>
			<CircularProgress />
		</Box>
	) : (
		<ItemList productos={productos} />
	);
};
