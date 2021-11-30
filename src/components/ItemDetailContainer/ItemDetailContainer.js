import { CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchData } from '../../helpers/fetchData';
import { ItemDetail } from '../ItemDetail/ItemDetail';

export const ItemDetailContainer = () => {
	const [item, setItem] = useState();
	const [loading, setLoading] = useState(false);

	const { itemID } = useParams();

	console.log(itemID);

	useEffect(() => {
		setLoading(true);

		fetchData()
			.then((resp) => {
				setItem(resp.find((prod) => prod.id === Number(itemID)));
			})
			.finally(() => {
				setLoading(false);
			});
	}, [itemID]);
	console.log(item);

	return <>{loading ? <CircularProgress /> : <ItemDetail {...item} />}</>;
};
