import React from 'react';

export const Contenedor = ({ children }) => {
	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: '1fr 1fr 1fr 1fr',
				width: '75%',
				margin: 'auto',
			}}
		>
			{children}
		</div>
	);
};
