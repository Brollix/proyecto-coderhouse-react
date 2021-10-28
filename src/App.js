import logo from './logo.svg';
import './App.css';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Soy Agustin Brollo, en el siguiente link en celeste les dejo
					mi repositorio de GitHub:
				</p>
				<a
					className="App-link"
					href="https://github.com/Brollix"
					target="_blank"
					rel="noopener noreferrer"
				>
					Brollix
				</a>
			</header>
		</div>
	);
}

export default App;
