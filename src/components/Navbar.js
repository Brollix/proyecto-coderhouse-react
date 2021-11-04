import React from 'react';
import './Navbar.css';

export default function Navbar() {
	return (
		<nav className="NavbarItems">
			<h1 className="navbar-logo">
				<i className="fa-2x fab fa-ethereum" />
				Monte Crypto
			</h1>

			<div className="container">
				<span className="fas fa-shopping-cart" />
			</div>

			<div className="menu-icon">
				<i className="fas fa-bars" />
			</div>
		</nav>
	);
}
