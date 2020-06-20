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
A super simple, *read-only* counter example.
Statical counter value of '${store.getState().example.count}'.
Uses a minimal subset of the Redux Toolkit api:
  - createSlice
  - configureStore

Note: the entire store/slice example is contained within a single file for readability.
`;
