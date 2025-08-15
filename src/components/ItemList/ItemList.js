import React from 'react'
import { Item } from '../Item/Item'
import './ItemList.css'

export const ItemList = ({ productos, usdArsRate, build, isCompatible }) => {
    return (
        <div className="container">
            {productos.map((prod) => (
                <Item key={prod.id} {...prod} usdArsRate={usdArsRate} build={build} isCompatible={isCompatible} />
            ))}
        </div>
    )
}
