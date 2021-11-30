import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Item } from '../Item/Item';

export const ItemList = ({ productos }) => {
	return (
		<>
			<Typography variant="h4" sx={{ padding: '1rem' }}>
				Productos: CPU, Motherboard y RAM
			</Typography>

			<Grid container>
				{productos.map((prod) => (
					<Item key={prod.id} {...prod} />
				))}
			</Grid>
		</>
	);
};
