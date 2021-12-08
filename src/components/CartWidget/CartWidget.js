import React, { useContext } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from '../../context/CartContext';

export const CartWidget = () => {
	const { totalCantidad } = useContext(CartContext);
	return (
		<>
			<ShoppingCartIcon />
			<span>{totalCantidad()}</span>
		</>
	);
};
