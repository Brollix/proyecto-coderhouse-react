import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer';
import { Contenedor } from './components/Contenedor/Contenedor';
import { ItemCount } from './components/ItemCount/ItemCount';

function App() {
	return (
		<div className="App">
			<Navbar />
			<Contenedor>
				<ItemListContainer
					titulo="Monte Crypto"
					saludo="Bienvenido a Monte Crypto!"
				/>
				<ItemCount />
			</Contenedor>
		</div>
	);
}

export default App;
