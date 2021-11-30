import React from 'react';
import { Link } from 'react-router-dom';
import { CartWidget } from '../CartWidget/CartWidget';
import './Navbar.css';

export const NavBar = () => {
	return (
		<nav className="NavbarItems">
			<Link to="/">
				<h1 className="navbar-logo">
					<i className="fa-2x fab fa-ethereum" />
					Monte Crypto
				</h1>
			</Link>

			<Link to="cart">
				<CartWidget />
			</Link>

			<div className="menu-icon">
				<i className="fas fa-bars" />
			</div>
		</nav>
	);
};
