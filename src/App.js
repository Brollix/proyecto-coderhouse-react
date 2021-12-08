import React from 'react';
import { NavBar } from './components/Navbar/NavBar';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import './App.css';
import { CartProvider } from './context/CartContext';

function App() {
	return (
		<CartProvider>
			<BrowserRouter>
				<NavBar />
				<AppRouter />
			</BrowserRouter>
		</CartProvider>
	);
}

export default App;
