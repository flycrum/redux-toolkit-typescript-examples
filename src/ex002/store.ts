import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const slice = createSlice({
	name: 'Example002',
	initialState: {
		count: 0,
	},
	reducers: {
		increment(state, action: PayloadAction<number>) {
			state.count += action.payload;
		},
	},
});

export const {
	increment,
} = slice.actions;

export const store = configureStore({
	reducer: {
		example: slice.reducer,
	},
});

export type ExampleStateType = ReturnType<typeof store.getState>;
export const useExampleSelector = useSelector as TypedUseSelectorHook<ExampleStateType>;
