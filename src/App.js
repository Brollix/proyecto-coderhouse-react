import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer';
import { Contenedor } from './components/Contenedor/Contenedor';

function App() {
	return (
		<div className="App">
			<Navbar />
			<Contenedor>
				<ItemListContainer
					titulo="Monte Crypto"
					saludo="Bienvenido a Monte Crypto!"
				/>
			</Contenedor>
		</div>
	);
}

export default App;
