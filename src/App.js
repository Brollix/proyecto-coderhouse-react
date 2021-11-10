import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import ItemListContainer from './components/ItemListContainer/ItemListContainer.js';

function App() {
	return (
		<div className="App">
			<Navbar />
			<ItemListContainer
				titulo="Monte Crypto"
				saludo="Bienvenido a Monte Crypto!"
			/>
		</div>
	);
}

export default App;
