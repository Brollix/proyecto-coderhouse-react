import React from 'react'
import { Link } from 'react-router-dom'
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows'
import './Navbar.css'
import { CartWidget } from '../CartWidget/CartWidget'

export const Navbar = () => {
	return (
		<div>
			<ul className="appbar">
				<Link to="/productos" style={{ textDecoration: 'none' }}>
					<li className="navbar-logo">
						<DesktopWindowsIcon className="logo" />
						Monte Crypto
					</li>
				</Link>

				<Link to="/cart" style={{ textDecoration: 'none' }}>
					<li>
						<CartWidget className="cart" />
					</li>
				</Link>
			</ul>
		</div>
	)
}
