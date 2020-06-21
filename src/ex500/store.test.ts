import { store, incrementAfterAsyncEffectThunk } from './store';
import Ex003_Thunk_AsyncIncrement from './Ex003_Thunk_AsyncIncrement';
import sleep from '../shared/helpers/sleep';

describe(Ex003_Thunk_AsyncIncrement.name, () => {
	it('should equal initial state via getState', () => {
		expect(store.getState().example.count)
			.toEqual(0);
	});

	it('should handle async increment thunk', async () => {
		expect(store.getState().example.isLoading)
			.toEqual(false);

		store.dispatch(incrementAfterAsyncEffectThunk(5));

		expect(store.getState().example.count)
			.toEqual(0);
		expect(store.getState().example.isLoading)
			.toEqual(true);

		await sleep(900);

		expect(store.getState().example.count)
			.toEqual(0);
		expect(store.getState().example.isLoading)
			.toEqual(true);

		await sleep(200);

		expect(store.getState().example.count)
			.toEqual(5);
		expect(store.getState().example.isLoading)
			.toEqual(false);
	});
});
