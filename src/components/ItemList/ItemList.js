import React from 'react';
import { Grid } from '@mui/material';
import { Item } from '../Item/Item';

export const ItemList = ({ productos }) => {
	return (
		<>
			<h2>Productos:</h2>
			<h2>CPU, Motherboard y RAM</h2>
			<br />
			<Grid container>
				{productos.map((prod) => (
					<Item key={prod.id} {...prod} />
				))}
			</Grid>
		</>
	);
};
