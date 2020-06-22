import React from 'react';
import { store, useExampleSelector, storeExample500 } from './store';
import Spinner from '../shared/components/Spinner';

export default function Ex500() {
	const { count, isLoading } = useExampleSelector((state) => state.example);

	return (
		<div>
			{/* use convenience 'request' list of thunks automatically wrapped in the store dispatch */}
			<button onClick={() => storeExample500.slice.request.decrementAfterAsyncEffectThunk(500)}>
				- Decrement
			</button>
			{ ' ' }
			{ count }
			{ isLoading && (
				<span style={{ display: 'inline-block', width: '40px', height: '10px'}}>
					<Spinner />
				</span>
			)}
			{ ' ' }
			{/*<button onClick={() => yoyo.slice.dispatch.increment(102)}>*/}
			<button onClick={() => storeExample500.slice.request.incrementAfterAsyncEffectThunk(500)}>
				+ Increment
			</button>
		</div>
	);
}

Ex500.store = store;
Ex500.description = `
A magical, yet unproven and highly experimental, way to bundle more of a slice into a single definition
to allow for built-in helpers, typings, and even inline thunk calls.

Added properties and methods:
  - dispatch: wraps actions in store.dispatch
  - thunks: list of thunk definitions that automatically wrap functions in auto-named 'createAsyncThunk'
  - think: wraps thunks in store.dispatch (todo: not yet typed)
`;
