import React, { useContext, useState } from 'react'
import { Button, Card, Typography, CardMedia } from '@mui/material'
import { Box } from '@mui/system'
import { ItemCount } from '../ItemCount/ItemCount'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'

export const ItemDetail = ({
	id,
	tipo,
	marca,
	serie,
	socket,
	imagen,
	precio,
	stock,
}) => {
	const { addToCart } = useContext(CartContext)

	let socketOption
	let ref

	if (tipo === 'CPU' || tipo === 'Motherboard') {
		socketOption = socket[0]
		ref = 'Socket: '
	} else if (tipo === 'RAM') {
		socketOption = socket[1]
		ref = 'Memoria: '
	}

	const [cantidad, setCantidad] = useState(0)

	const handleAddToCart = () => {
		if (cantidad < stock && cantidad > 0) {
			addToCart({
				id,
				tipo,
				marca,
				serie,
				socket,
				imagen,
				precio,
				cantidad,
				stock,
			})
		}
	}

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
				<ItemCount
					precio={precio}
					cantidad={cantidad}
					setCantidad={setCantidad}
				/>

				<Link to="/cart">
					<Button
						sx={{
							margin: '1rem',
							textDecoration: 'none',
						}}
						type="text"
						variant="contained"
						color="success"
						onClick={handleAddToCart}
					>
						Agregar al Carrito
					</Button>
				</Link>
			</Card>
		</Box>
	)
}
