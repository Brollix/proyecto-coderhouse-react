import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import {
	collection,
	Timestamp,
	getDocs,
	addDoc,
	writeBatch,
	query,
	where,
	documentId,
} from 'firebase/firestore/lite';
import { db } from '../../firebase/config';
import {
	Typography,
	Paper,
	TextField,
	Button,
	Link,
	Modal,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { Box } from '@mui/system';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export const Checkout = () => {
	const { cart, totalCompra } = useContext(CartContext);

	const [values, setValues] = useState({
		nombre: '',
		email: '',
		telefono: '',
	});

	const handleInputChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const orden = {
			buyer: { ...values },
			items: cart,
			total: totalCompra(),
			date: Timestamp.fromDate(new Date()),
		};

		const batch = writeBatch(db);

		const orderRef = collection(db, 'orders');
		const productosRef = collection(db, 'productos');
		const q = query(
			productosRef,
			where(
				documentId(),
				'in',
				cart.map((prod) => prod.id)
			)
		);

		const outOfStock = [];

		const productos = await getDocs(q);

		productos.docs.forEach((doc) => {
			const itemUpdate = cart.find((prod) => prod.id === doc.id);

			if (doc.data().stock >= itemUpdate.cantidad) {
				batch.update(doc.ref, {
					stock: doc.data().stock - itemUpdate.cantidad,
				});
			} else {
				outOfStock.push(itemUpdate);
			}
		});

		if (outOfStock.length === 0) {
			addDoc(orderRef, orden).then((res) => {
				batch.commit();
				console.log(cart);

				return (
					<div>
						<Modal open={open} onClose={handleClose}>
							<Box sx={style}>
								<DoneIcon />
								<Typography variant="h3" color="initial">
									Su Orden ha sido Registrada!
								</Typography>
								<Typography variant="h5" color="initial">
									Su numero de Orden: {res.id}
								</Typography>
								<Button variant="text" color="primary">
									<Link to="/">Aceptar</Link>
								</Button>
							</Box>
						</Modal>
					</div>
				);
			});
		} else {
			console.log(outOfStock);
		}
	};

	return (
		<>
			{cart.length > 0 ? (
				<Paper>
					<Typography variant="h3" color="primary">
						Ingresá tus Datos
					</Typography>
					<Typography variant="body1" color="initial"></Typography>

					<form onSubmit={handleSubmit}>
						<TextField
							onChange={handleInputChange}
							name="nombre"
							variant="outlined"
							value={values.nombre}
							label="Nombre"
							required
						/>
						<TextField
							onChange={handleInputChange}
							name="email"
							variant="outlined"
							value={values.email}
							type="email"
							label="Email"
							required
						/>
						<TextField
							onChange={handleInputChange}
							name="telefono"
							variant="outlined"
							value={values.telefono}
							type="number"
							label="Teléfono"
							required
						/>
						<Button
							onClick={handleOpen}
							type="submit"
							variant="contained"
							color="secondary"
						>
							Enviar
						</Button>
					</form>
				</Paper>
			) : (
				<Button variant="outlined" color="primary">
					<Link to="/">Volver a Inicio</Link>
				</Button>
			)}
		</>
	);
};
