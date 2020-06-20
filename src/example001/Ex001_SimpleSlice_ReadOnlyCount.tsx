import React from 'react';
import { store, ExampleStateType } from './store';
import { useSelector } from 'react-redux';

export default function Ex001_SimpleSlice_ReadOnlyCount() {
	const { count } = useSelector((state: ExampleStateType) => state.example);

	return (
		<div>
			Increment:
			{ ' ' }
			{ count }
		</div>
	);
}

Ex001_SimpleSlice_ReadOnlyCount.store = store;
Ex001_SimpleSlice_ReadOnlyCount.description = `
A read-only counter example (starting at '${store.getState().example.count}') that leverages a simplified portion of the Redux Toolkit api:
  - createSlice
  - configureStore

Note: the entire store/slice example is contained within a single file for readability.
`;
