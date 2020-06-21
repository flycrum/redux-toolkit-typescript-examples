import React, { useState } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import Ex001_SimpleSlice_ReadOnlyCount from './ex001/Ex001_SimpleSlice_ReadOnlyCount';
import Ex002_SliceReducer_IncrementCounter from './ex002/Ex002_SliceReducer_IncrementCounter';
import Ex003_Thunk_AsyncIncrement from './ex003/Ex003_Thunk_AsyncIncrement';

function App() {
	const examples = [
		Ex001_SimpleSlice_ReadOnlyCount,
		Ex002_SliceReducer_IncrementCounter,
		Ex003_Thunk_AsyncIncrement,
	];
	const [ currentExampleIndex, set_currentExampleIndex ] = useState(0);
	const getPrevIndex = () => (currentExampleIndex + examples.length - 1) % examples.length;
	const getNextIndex = () => (currentExampleIndex + 1) % examples.length;
	const ExampleComponentBefore = examples[getPrevIndex()];
	const ExampleComponent = examples[currentExampleIndex];
	const ExampleComponentAfter = examples[getNextIndex()];
	const description = ExampleComponent.description?.trim();

	return (
		<Provider store={ExampleComponent.store}>
			<div className="App">
				<header>
					<nav>
						{ ExampleComponentBefore && (
							<div>
								<button onClick={() => set_currentExampleIndex(getPrevIndex())}>
									{ '< ' }
									{ ExampleComponentBefore.name }
									{ ' <' }
								</button>
							</div>
						)}
						<select
							value={currentExampleIndex}
							onChange={(event) => set_currentExampleIndex(event.target.value as any)}
						>
							{ examples.map((Example, index) => (
								<option
									key={ Example.name }
									value={ index }
								>
									{ Example.name }
								</option>
							))}
						</select>
						{ ExampleComponentAfter && (
							<div>
								<button onClick={() => set_currentExampleIndex(getNextIndex())}>
									{ '> ' }
									{ ExampleComponentAfter.name }
									{ ' >' }
								</button>
							</div>
						)}
					</nav>
					<h1>{ ExampleComponent.name }</h1>
					{ description && (
						<pre>{ description }</pre>
					)}
				</header>
				<main>
					<ExampleComponent />
				</main>
			</div>
		</Provider>
	);
}

export default App;
