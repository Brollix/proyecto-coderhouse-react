import React, { Component } from 'react';
import { MenuItems } from './MenuItems';
import './Navbar.css';

class Navbar extends Component {
	render() {
		return (
			<nav className="NavbarItems">
				<span className="fas fa-desktop" />
				<h1 className="navbar-logo">BlackComponents</h1>
				<div className="menu-icon">
					<i className="fas fa-bars" />
				</div>

				<div className="container">
					<span className="fas fa-shopping-cart"></span>
					<h3 className="cart-count">0</h3>
				</div>
			</nav>
		);
	}
}

export default Navbar;
