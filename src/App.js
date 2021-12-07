import React, { useState } from 'react';
import { NavBar } from './components/Navbar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer';
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer';
import { CartView } from './components/CartView/CartView';
import './App.css';
import { CartContext } from './context/CartContext';

function App() {
	const [cart, setCart] = useState([]);

	console.log(cart);

	const addToCart = (item) => {
		setCart([...cart, item]);
	};

	const removeFromCart = (id) => {
		setCart(cart.filter((prod) => prod.id !== id));
	};

	const emptyCart = () => {
		setCart([]);
	};

	const isInCart = (id) => {
		return cart.some((prod) => prod.id === id);
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				emptyCart,
				isInCart,
			}}
		>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/" element={<ItemListContainer />} />
					<Route path="/productos" element={<ItemListContainer />} />
					<Route
						path="/productos/:typeID"
						element={<ItemListContainer />}
					/>
					<Route
						path="/detail/:itemID"
						element={<ItemDetailContainer />}
					/>
					<Route path="/cart" element={<CartView />} />
				</Routes>
			</BrowserRouter>
		</CartContext.Provider>
	);
}

export default App;
