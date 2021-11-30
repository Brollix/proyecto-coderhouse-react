import React, { useState } from 'react';
import './ItemCount.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';

export const ItemCount = ({ precio }) => {
	const [cantidad, setCantidad] = useState(0);

	const handleClickAdd = () => {
		setCantidad(cantidad + 1);
	};

	const handleClickRemove = () => {
		if (cantidad > 0) {
			setCantidad(cantidad - 1);
		}
	};

	const handleClickEmpty = () => {
		if (cantidad > 0) {
			setCantidad(cantidad - cantidad);
		}
	};

	return (
		<Paper>
			<Typography variant="h6">Cantidad: {cantidad}</Typography>
			<Typography variant="body1">
				Subtotal USD$ {cantidad * precio}
			</Typography>

			<ButtonGroup sx={{ margin: '1rem' }}>
				<Button
					variant="contained"
					color="primary"
					onClick={handleClickRemove}
				>
					-
				</Button>
				<Button
					variant="outlined"
					color="error"
					onClick={handleClickEmpty}
				>
					Vaciar
				</Button>
				<Button
					variant="contained"
					color="primary"
					onClick={handleClickAdd}
				>
					+
				</Button>
			</ButtonGroup>
		</Paper>
	);
};
