import React from 'react';
import { store, useExampleSelector, incrementAfterAsyncEffectThunk } from './store';
import Spinner from '../shared/components/Spinner';

export default function Ex003_Thunk_AsyncIncrement() {
	const { count, isLoading } = useExampleSelector((state) => state.example);

	return (
		<div>
			<button onClick={() => store.dispatch(incrementAfterAsyncEffectThunk(1))}>
				Increment:
				{ ' ' }
				{ count }
				{ isLoading && (
					<Spinner />
				)}
			</button>
		</div>
	);
}

Ex003_Thunk_AsyncIncrement.store = store;
Ex003_Thunk_AsyncIncrement.description = `
Demonstrate async increment side effect using Redux Toolkit api:
  - createAsyncThunk

This example also features a simple spinner.

Out of scope: gracefully handling the loader with a queue of dispatched actions.
`;
