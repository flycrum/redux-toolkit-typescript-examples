import React from 'react';
import { store, useExampleSelector, ExampleStateType, incrementAfterAsyncEffectThunk } from './store';
import Spinner from '../shared/components/Spinner';

export default function Ex005() {
	const { count, isLoading } = useExampleSelector((state: ExampleStateType) => state.example);

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

Ex005.store = store;
Ex005.description = `
A magical, yet unproven, way to bundle more of a slice into a single definition
to allow for built-in helpers, typings, and even inline thunks.

Added properties and methods:
  - dispatch: wraps actions in store.dispatch
  -
`;
