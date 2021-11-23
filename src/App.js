import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
// import { ItemListContainer } from './components/ItemListContainer/ItemListContainer';
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer';
import { Contenedor } from './components/Contenedor/Contenedor';

function App() {
	return (
		<div className="App">
			<Navbar />
			<Contenedor>
				<ItemDetailContainer />
			</Contenedor>
		</div>
	);
}

export default App;
