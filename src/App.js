import React from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'
import './App.css'
import { CartProvider } from './context/CartContext'

function App() {
	return (
		<CartProvider>
			<BrowserRouter>
				<Navbar />
				<h2>Productos: CPU, Motherboard y RAM</h2>
				<AppRouter />
			</BrowserRouter>
		</CartProvider>
	)
}

export default App
