import { store } from './store';
import Ex001_SimpleSlice_ReadOnlyCount from './Ex001_SimpleSlice_ReadOnlyCount';

describe(Ex001_SimpleSlice_ReadOnlyCount.name, () => {
	it('should equal initial state via getState', () => {
		expect(
			store.getState().example.count
		).toEqual(
			1
		);
	});
});
