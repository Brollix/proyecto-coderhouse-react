import React, { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import {
	collection,
	Timestamp,
	getDocs,
	addDoc,
	writeBatch,
	query,
	where,
	documentId,
} from 'firebase/firestore/lite'
import { db } from '../../firebase/config'
import { Typography, Paper, TextField, Button, Link } from '@mui/material'

import { BasicModal } from './Modal.js'

export const Checkout = ({ handleOpen }) => {
	const { cart, totalCompra } = useContext(CartContext)

	const [open, setOpen] = React.useState(false)

	const [values, setValues] = useState({
		nombre: '',
		email: '',
		telefono: '',
	})

	const handleInputChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const orden = {
			buyer: { ...values },
			items: cart,
			total: totalCompra(),
			date: Timestamp.fromDate(new Date()),
		}

		const batch = writeBatch(db)

		const orderRef = collection(db, 'orders')
		const productosRef = collection(db, 'productos')
		const q = query(
			productosRef,
			where(
				documentId(),
				'in',
				cart.map((prod) => prod.id)
			)
		)

		const outOfStock = []

		const productos = await getDocs(q)

		productos.docs.forEach((doc) => {
			const itemUpdate = cart.find((prod) => prod.id === doc.id)

			if (doc.data().stock >= itemUpdate.cantidad) {
				batch.update(doc.ref, {
					stock: doc.data().stock - itemUpdate.cantidad,
				})
			} else {
				outOfStock.push(itemUpdate)
			}
		})

		if (outOfStock.length === 0) {
			addDoc(orderRef, orden).then((res) => {
				batch.commit()
				setOpen(true)
			})
		} else {
			console.log(outOfStock)
		}
	}

	return (
		<>
			{cart.length > 0 ? (
				<Paper>
					<Typography variant="h3" color="primary">
						Ingresá tus Datos
					</Typography>
					<Typography variant="body1" color="initial"></Typography>

					<BasicModal
						isOpen={open}
						cart={cart}
						handleClose={() => setOpen(false)}
					/>
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
			) : null}
		</>
	)
}
