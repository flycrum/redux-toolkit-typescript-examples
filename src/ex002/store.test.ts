import { store, increment } from './store';
import Ex002_SliceReducer_IncrementCounter from './Ex002_SliceReducer_IncrementCounter';

describe(Ex002_SliceReducer_IncrementCounter.name, () => {
	it('should equal initial state via getState', () => {
		expect(store.getState().example.count)
			.toEqual(0);
	});

	it('should equal incremented value', () => {
		store.dispatch(increment(3));

		expect(store.getState().example.count)
			.toEqual(3);
	});
});
