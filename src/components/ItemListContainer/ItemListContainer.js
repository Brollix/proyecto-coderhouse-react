import React, { Fragment } from 'react';

export const ItemListContainer = ({ titulo, saludo }) => {
	return (
		<div>
			<h1>{titulo}</h1>
			<hr />
			<p>{saludo}</p>
		</div>
	);
};
