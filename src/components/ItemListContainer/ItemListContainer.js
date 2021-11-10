import React from 'react';

const ItemListContainer = ({ titulo, saludo }) => {
	return (
		<div>
			<h2>{titulo}</h2>
			<hr />
			<p>{saludo}</p>
		</div>
	);
};

export default ItemListContainer;
