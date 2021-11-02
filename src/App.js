import React from 'react';
import Navbar from './components/Navbar.js';
import CartWidget from './components/CartWidget.js';
import './App.css';

function App() {
	return (
		<div className="App">
			<Navbar />
			<CartWidget />
		</div>
	);
}

export default App;
