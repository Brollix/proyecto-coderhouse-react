import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getDoc, doc } from 'firebase/firestore/lite'
import { db } from '../../firebase/config'
import { ItemDetail } from '../ItemDetail/ItemDetail'

export const ItemDetailContainer = () => {
	const [item, setItem] = useState()
	const [loading, setLoading] = useState(false)

	const { itemID } = useParams()

	useEffect(() => {
		setLoading(true)

		const docRef = doc(db, 'productos', itemID)
		getDoc(docRef)
			.then((doc) => {
				setItem({
					id: doc.id,
					...doc.data(),
				})
			})
			.finally(() => {
				setLoading(false)
			})
	}, [itemID])

	return (
		<>
			{loading ? (
				<div>
					<i className="fas fa-spinner fa-spin"></i>
				</div>
			) : (
				<div className="detail-container">
					<ItemDetail {...item} />
				</div>
			)}
		</>
	)
}
