import React from 'react'
import { Item } from '../Item/Item'
import './ItemList.css'

export const ItemList = ({ productos }) => {
	return (
		<div className="container">
			{productos.map((prod) => (
				<Item key={prod.id} {...prod} />
			))}
		</div>
	)
}
