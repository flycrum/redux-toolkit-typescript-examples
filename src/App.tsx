import React, { useState } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import Ex001_SimpleSlice_ReadOnlyCount from './example001/Ex001_SimpleSlice_ReadOnlyCount';
import Example002 from './example002/Example002';

function App() {
	const examples = [
		Ex001_SimpleSlice_ReadOnlyCount,
		Example002,
	];
	const [ currentExampleIndex, set_currentExampleIndex ] = useState(0);
	const ExampleComponent = examples[currentExampleIndex];

	return (
		<Provider store={ExampleComponent.store}>
			<div className="App">
				<ul className="Nav">
					{
						examples.map((Example, index) => (
							<li className={currentExampleIndex === index ? 'active' : undefined}>
								<a onClick={() => set_currentExampleIndex(index)}>
									{ Example.name }
								</a>
							</li>
						))
					}
				</ul>
				<header>
					<h1>{ ExampleComponent.name }</h1>
					<pre>{ ExampleComponent.description?.trim() }</pre>
				</header>
				<main>
					<ExampleComponent />
				</main>
			</div>
		</Provider>
	);
}

export default App;
