import React, { Component } from 'react';
import { MenuItems } from './MenuItems';
import './Navbar.css';

class Navbar extends Component {
	state = { clicked: false };

	handleClick = () => {
		this.setState({ clicked: !this.state.clicked });
	};

	render() {
		return (
			<nav className="NavbarItems">
				<span className="fas fa-desktop" />
				<h1 className="navbar-logo">BlackComponents</h1>
				<div className="menu-icon" onClick={this.handleClick}>
					<i
						className={
							this.state.clicked ? 'fas fa-times' : 'fas fa-bars'
						}
					/>
				</div>
				<ul
					className={
						this.state.clicked ? 'nav-menu active' : 'nav-menu'
					}
				>
					{MenuItems.map((item, index) => {
						return (
							<li key={index}>
								<a className={item.className} href={item.url}>
									{item.title}
								</a>
							</li>
						);
					})}
				</ul>
			</nav>
		);
	}
}

export default Navbar;
