import React, { useEffect, useState } from 'react';
import { fetchData } from '../../helpers/fetchData';
import { ItemList } from '../ItemList/ItemList';
import { useParams } from 'react-router';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import './ItemListContainer.css';

export const ItemListContainer = () => {
	const [loading, setLoading] = useState(false);
	const [productos, setProductos] = useState([]);

	const { typeID } = useParams();
	console.log(typeID);

	useEffect(() => {
		setLoading(true);
		fetchData()
			.then((resp) => {
				if (!typeID) {
					setProductos(resp);
				} else {
					setProductos(resp.filter((prod) => prod.tipo === typeID));
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [typeID]);

	return loading ? (
		<Box
			sx={{
				display: 'flex',
				padding: '1rem',
				right: '50%',
				top: '25%',
			}}
		>
			<CircularProgress />
		</Box>
	) : (
		<ItemList productos={productos} />
	);
};
