import { configureStore, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import sleep from '../shared/helpers/sleep';

const slice = createSlice({
	name: 'Example003',
	initialState: {
		count: 0,
		isLoading: false,
	},
	reducers: {
		increment(state, action: PayloadAction<number>) {
			state.count += action.payload;
		},
		setLoading(state, { payload: isLoading }: PayloadAction<boolean>) {
			state.isLoading = isLoading;
		},
	},
});

export const {
	increment,
	setLoading,
} = slice.actions;

export const store = configureStore({
	reducer: {
		example: slice.reducer,
	},
});

// Define a thunk that dispatches those action creators
export const incrementAfterAsyncEffectThunk = createAsyncThunk(
	`${slice.name}/incrementAfterAsyncEffectThunk`,
	// Declare the type your function argument here:
	async (num: number) => {
		store.dispatch(setLoading(true));
		await sleep(1000);
		store.dispatch(increment(num));
		store.dispatch(setLoading(false));
	}
)

export type ExampleStateType = ReturnType<typeof store.getState>;
export const useExampleSelector = useSelector as TypedUseSelectorHook<ExampleStateType>;
