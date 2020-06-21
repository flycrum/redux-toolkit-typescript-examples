import { configureStore, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import sleep from '../shared/helpers/sleep';

// Define a thunk that dispatches those action creators
export const incrementAfterAsyncEffectThunk = createAsyncThunk(
	`Example003_2/incrementAfterAsyncEffectThunk`,
	async (num: number) => {
		await sleep(1000);
		// TS cannot mix explicit and inferred generic parameters, from this point on you'll have to define the Returned and ThunkArg generic parameter as well.
		return num as number;
	}
)

const slice = createSlice({
	name: 'Example003_2',
	initialState: {
		count: 0,
		isLoading: false,
	},
	reducers: {
		setLoading(state, { payload: isLoading }: PayloadAction<boolean>) {
			state.isLoading = isLoading;
		},
	},
	extraReducers: builder => {
		builder.addCase(incrementAfterAsyncEffectThunk.pending, (state, { payload, meta }) => {
			console.log('...pending:', meta);
			state.isLoading = true;
		})
		builder.addCase(incrementAfterAsyncEffectThunk.fulfilled, (state, { payload, meta }) => {
			console.log('...fulfilled:', meta);
			state.count += payload;

			// if trying to call another action, it must be delayed (is there a better way of doing this?)
			setTimeout(() => store.dispatch(slice.actions.setLoading(false)));
		})
		builder.addCase(incrementAfterAsyncEffectThunk.rejected, (state, action) => {
			console.log('...rejected');
			state.isLoading = false;
		})
	}
});

export const store = configureStore({
	reducer: {
		example: slice.reducer,
	},
});

export type ExampleStateType = ReturnType<typeof store.getState>;
export const useExampleSelector = useSelector as TypedUseSelectorHook<ExampleStateType>;
