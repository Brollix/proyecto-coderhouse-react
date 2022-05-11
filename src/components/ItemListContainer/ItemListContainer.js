import React, { useEffect, useState } from 'react'
import { ItemList } from '../ItemList/ItemList'
import { useParams } from 'react-router'
import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore/lite'
import { db } from '../../firebase/config'
import './ItemListContainer.css'

export const ItemListContainer = () => {
	const [loading, setLoading] = useState(false)
	const [productos, setProductos] = useState([])

	const { typeID } = useParams()

	useEffect(() => {
		setLoading(true)

		const productosRef = collection(db, 'productos')

		getDocs(productosRef)
			.then((collection) => {
				const items = collection.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}))

				if (typeID) {
					const filtered = items.filter(
						(prods) => prods.tipo === typeID
					)
					setProductos(filtered)
				} else {
					setProductos(items)
				}
			})
			.finally(() => {
				setLoading(false)
			})
	}, [typeID])

	return loading ? (
		<Box
			sx={{
				display: 'flex',
				padding: '1rem',
				right: '50%',
				top: '25%',
			}}
		>
			<CircularProgress />
		</Box>
	) : (
		<ItemList productos={productos} />
	)
}
