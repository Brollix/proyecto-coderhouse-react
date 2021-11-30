import React from 'react';
import { NavBar } from './components/Navbar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer';
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer';
import { CartView } from './components/CartView/CartView';
import './App.css';

function App() {
	return (
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
	);
}

export default App;
