import React, { useContext, useState } from 'react';
import {
	Button,
	Card,
	Typography,
	ButtonGroup,
	CardMedia,
} from '@mui/material';
import { Box } from '@mui/system';
import { ItemCount } from '../ItemCount/ItemCount';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export const ItemDetail = ({
	id,
	tipo,
	marca,
	serie,
	socket,
	imagen,
	precio,
}) => {
	const { addToCart, isInCart } = useContext(CartContext);

	let socketOption;
	let ref;

	if (tipo === 'CPU' || tipo === 'Motherboard') {
		socketOption = socket[0];
		ref = 'Socket: ';
	} else if (tipo === 'RAM') {
		socketOption = socket[1];
		ref = 'Memoria: ';
	}

	const [cantidad, setCantidad] = useState(0);

	const handleAddToCart = () => {
		console.log(cantidad);
		if (cantidad > 0) {
			addToCart({
				id,
				tipo,
				marca,
				serie,
				socket,
				imagen,
				precio,
				cantidad,
			});
		}
	};

	return (
		<Box>
			<Card
				key={id}
				sx={{
					width: '250px',
					maxHeight: '650px',
				}}
			>
				<CardMedia component="img" title={imagen} image={imagen} />
				<Typography variant="h5" color="initial">
					{tipo + ' ' + marca + ' ' + serie}
				</Typography>
				<Typography variant="body2">
					{ref}
					{socketOption}
				</Typography>
				<Typography variant="h5" color="initial">
					USD${precio}
				</Typography>

				{!isInCart(id) ? (
					<>
						<ItemCount
							precio={precio}
							cantidad={cantidad}
							setCantidad={setCantidad}
						/>
						<Button
							sx={{ margin: '1rem' }}
							variant="contained"
							color="success"
							onClick={handleAddToCart}
						>
							Agregar al Carrito
						</Button>
					</>
				) : (
					<>
						<ButtonGroup
							variant="text"
							color="primary"
							aria-label=""
						>
							<Button variant="contained" color="primary">
								<Link to="/"> Volver al Inicio </Link>
							</Button>
							<Button variant="text" color="success">
								<Link to="/cart">Terminar mi Compra</Link>
							</Button>
						</ButtonGroup>
					</>
				)}
			</Card>
		</Box>
	);
};
