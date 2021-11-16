import React, { useState } from 'react';
import './ItemCount.css';
import Button from '@mui/material/Button';

export const ItemCount = () => {
	const [item, setItem] = useState(0);

	const handleClickAdd = () => {
		setItem(item + 1);
	};

	const handleClickEmpty = () => {
		if (item > 0) {
			setItem(item - item);
		}
	};

	return (
		<div>
			<h1>Items: {item}</h1>
			<Button
				variant="contained"
				color="primary"
				onClick={handleClickAdd}
			>
				Agregar Item al Carrito
			</Button>
			<Button
				variant="contained"
				color="error"
				onClick={handleClickEmpty}
			>
				Vaciar Carrito
			</Button>
		</div>
	);
};
