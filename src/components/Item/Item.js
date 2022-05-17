import React from 'react'
import { Link } from 'react-router-dom'
import './item.css'

export const Item = ({
	id,
	tipo,
	marca,
	serie,
	socket,
	imagen,
	precio,
	stock,
}) => {
	let socketRef
	if (tipo !== 'RAM') {
		socketRef = socket[0]
	} else socketRef = socket[1]

	return (
		<>
			<div className="card" key={id}>
				<img className="img" src={imagen} alt={{ marca } + { serie }} />
				<h2>{marca + ' ' + serie}</h2>
				<p>Socket {socketRef}</p>
				<h3>USD ${precio}</h3>

				<Link to={`/detail/${id}`} className="link">
					<button className="ver-mas">Ver Más</button>
				</Link>
			</div>
		</>
	)
}
