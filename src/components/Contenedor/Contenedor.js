import React from 'react';

export const Contenedor = ({ children }) => {
	return (
		<div
			style={{
				width: '50%',
				margin: 'auto',
			}}
		>
			{children}
		</div>
	);
};
