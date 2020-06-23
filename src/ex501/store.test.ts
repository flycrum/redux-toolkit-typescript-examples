import Ex501 from './Ex501';
import { store, sliceExample500 } from './store';

describe(Ex501.name, () => {
	afterEach(() => {
		sliceExample500.dispatch.reset();
	});

	it('should await inline thunk call delay', async () => {
		let time = Date.now();
		expect(store.getState().example.count)
			.toEqual(0);
		// wait for 5000 delay for inline request/dispatch of thunk
		await sliceExample500.request.decrementAfterAsyncEffectThunk({num: 500, delay: 2000});
		// expect delay from above await
		expect((Date.now() - time) > 1000)
			.toEqual(true);
		expect(store.getState().example.count)
			.toEqual(-500);
	});

	it('should bypass inline thunk call delay', async () => {
		let time = Date.now();
		expect(store.getState().example.count)
			.toEqual(0);
		// no await for inline request/dispatch
		const promise = sliceExample500.request.decrementAfterAsyncEffectThunk({num: 500, delay: 2000});
		// no substantial delay since there's not await above
		expect((Date.now() - time) > 1000)
			.toEqual(false);
		// value should not have been applied yet because we're not using await
		expect(store.getState().example.count)
			.toEqual(0);

		// cancel promise so its delayed logic doesn't interfere with subsequent tests
		promise.abort();
	});

	it('should await traditional thunk call delay', async () => {
		let time = Date.now();
		expect(store.getState().example.count)
			.toEqual(0);
		// wait for 5000 delay for normal dispatch
		await store.dispatch(sliceExample500.thunks.decrementAfterAsyncEffectThunk({num: 500, delay: 2000}));
		// expect delay from above await
		expect((Date.now() - time) > 1000)
			.toEqual(true);
		expect(store.getState().example.count)
			.toEqual(-500);
	});

	it('should bypass traditional thunk call delay', async () => {
		let time = Date.now();
		expect(store.getState().example.count)
			.toEqual(0);
		// no await for normal dispatch
		const promise = store.dispatch(sliceExample500.thunks.decrementAfterAsyncEffectThunk({num: 500, delay: 2000}));
		// no substantial delay since there's not await above
		expect((Date.now() - time) > 1000)
			.toEqual(false);
		expect(store.getState().example.count)
			.toEqual(0);

		// cancel promise so its delayed logic doesn't interfere with subsequent tests
		promise.abort();
	});
});
