import React, { useState } from 'react';
import './ItemCount.css';
import Button from '@mui/material/Button';

export const ItemCount = () => {
	const [item, setItem] = useState(0);

	const handleClick = () => {
		setItem(item + 1);
	};

	return (
		<div className="items">
			<h1>Items: {item}</h1>
			<Button variant="contained" color="primary" onClick={handleClick}>
				Agregar Item al Carrito
			</Button>
		</div>
	);
};
