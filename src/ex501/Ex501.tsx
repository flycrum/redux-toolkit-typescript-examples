import React from 'react';
import { store, useExampleSelector, sliceExample500 } from './store';
import Spinner from '../shared/components/Spinner';
import Ex500 from '../ex500/Ex500';

export default function Ex501() {
	const { count, isLoading } = useExampleSelector((state) => state.example);

	return (
		<div>
			<button onClick={() => sliceExample500.request.decrementAfterAsyncEffectThunk({num: 500, delay: 1000})}>
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
			<button onClick={() => sliceExample500.request.incrementAfterAsyncEffectThunk({num: 500, delay: 1000})}>
				+ Increment
			</button>
		</div>
	);
}

Ex501.store = store;
Ex501.description = `
Builds on ${Ex500.name} by inline mapping thunks with corresponding typings (fixed for dispatch).
`;
