import logo from './logo.svg';
import './App.css';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					<h1>Soy Agus</h1>
					<h3>Esta es mi React App</h3>
					en el siguiente link les dejo mi repositorio:
				</p>
				<a
					className="App-link"
					href="https://github.com/Brollix"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub
				</a>
			</header>
		</div>
	);
}

export default App;
