import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './Navbar.css';
import { AppBar, Toolbar } from '@mui/material';

export const NavBar = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Link to="/" style={{ textDecoration: 'none' }}>
						<DesktopWindowsIcon />
						Monte Crypto
					</Link>

					<Link to="cart" style={{ margin: 'auto' }}>
						<AddShoppingCartIcon
							style={{
								margin: 'auto',
								fontSize: '36px',
							}}
						/>
					</Link>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
