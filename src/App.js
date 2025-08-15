import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { BuildProvider } from './context/BuildContext'
import { Navbar } from './components/Navbar/Navbar'
import { AppRouter } from './router/AppRouter'
import './App.css'

function App() {
	return (
		<BuildProvider>
			<CartProvider>
				<BrowserRouter>
					<Navbar />					
					<AppRouter />
				</BrowserRouter>
			</CartProvider>
		</BuildProvider>
	)
}

export default App
