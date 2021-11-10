import React from 'react';
import CartWidget from '../../components/CartWidget/CartWidget.js';
import './Navbar.css';

export const Navbar = () => {
	return (
		<nav className="NavbarItems">
			<h1 className="navbar-logo">
				<i className="fa-2x fab fa-ethereum" />
				Monte Crypto
			</h1>

			<CartWidget />

			<div className="menu-icon">
				<i className="fas fa-bars" />
			</div>
		</nav>
	);
};
