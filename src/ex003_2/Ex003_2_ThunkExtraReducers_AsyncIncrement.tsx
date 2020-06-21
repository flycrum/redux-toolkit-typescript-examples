import React from 'react';
import { store, useExampleSelector, incrementAfterAsyncEffectThunk } from './store';
import Spinner from '../shared/components/Spinner';
import Ex003_Thunk_AsyncIncrement from '../ex003/Ex003_Thunk_AsyncIncrement';

export default function Ex003_2_ThunkExtraReducers_AsyncIncrement() {
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

Ex003_2_ThunkExtraReducers_AsyncIncrement.store = store;
Ex003_2_ThunkExtraReducers_AsyncIncrement.description = `
An alternative to ${Ex003_Thunk_AsyncIncrement.name}.
Handles a thunk using extraReducers and a builder callback.
`;
