import React from 'react';
import { NavBar } from './components/Navbar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer';
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer';

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path="/productos" element={<ItemListContainer />} />
				<Route
					path="/productos/:typeID"
					element={<ItemListContainer />}
				/>
				<Route path="/detail" element={<ItemDetailContainer />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
