import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { CartView } from '../CartView/CartView';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import './Navbar.css';
import { AppBar, Toolbar, IconButton } from '@mui/material';

export const NavBar = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Link to="/" style={{ textDecoration: 'none' }}>
						<DesktopWindowsIcon />
						Monte Crypto
					</Link>

					<Link
						to="cart"
						style={{ margin: 'auto', textDecoration: 'none' }}
					>
						<CartView />
					</Link>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
