import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import ItemList from './components/ItemList/ItemList.js';

function App() {
	return (
		<div className="App">
			<Navbar />
			<ItemList />
		</div>
	);
}

export default App;
