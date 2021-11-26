import React from 'react';
import { NavBar } from './components/Navbar/NavBar';
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer';
// import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer';

function App() {
	return (
		<>
			<NavBar />

			<ItemListContainer />
		</>
	);
}

export default App;
