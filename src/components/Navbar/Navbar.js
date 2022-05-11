import React from 'react'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows'
import './Navbar.css'
import { AppBar, Toolbar } from '@mui/material'
import { CartWidget } from '../CartWidget/CartWidget'

export const Navbar = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Link to="/productos" style={{ textDecoration: 'none' }}>
						<DesktopWindowsIcon />
						Monte Crypto
					</Link>

					<Link to="/cart" style={{ margin: 'auto' }}>
						<CartWidget />
					</Link>
				</Toolbar>
			</AppBar>
		</Box>
	)
}
