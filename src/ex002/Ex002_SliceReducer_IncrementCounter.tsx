import React from 'react';
import { store, increment, useExampleSelector, ExampleStateType } from './store';
import Ex001_SimpleSlice_ReadOnlyCount from '../ex001/Ex001_SimpleSlice_ReadOnlyCount';

export default function Ex002_SliceReducer_IncrementCounter() {
	const { count } = useExampleSelector((state: ExampleStateType) => state.example);

	return (
		<div>
			<button onClick={() => store.dispatch(increment(1))}>
				Increment:
				{ ' ' }
				{ count }
			</button>
		</div>
	);
}

Ex002_SliceReducer_IncrementCounter.store = store;
Ex002_SliceReducer_IncrementCounter.description = `
Builds on ${ Ex001_SimpleSlice_ReadOnlyCount.name }.
This example is *interactive*, introduces a typed hook selector, and leverages the Redux Toolkit api:
  - PayloadAction
...as well as the Redux api:
  - useSelector
  - TypedUseSelectorHook

Note: this examples counter starts with a value of '${store.getState().example.count}'.
`;
