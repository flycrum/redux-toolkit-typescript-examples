import {
	configureStore,
	createAsyncThunk,
	createSlice,
	PayloadAction,
	SliceCaseReducers,
	ValidateSliceCaseReducers,
} from '@reduxjs/toolkit';
import {
	TypedUseSelectorHook,
	useSelector,
} from 'react-redux';
import sleep from '../shared/helpers/sleep';

const createSlicePlus = <State, CaseReducers extends SliceCaseReducers<State>, Name extends string = string>(
	state: {
		name: Name
		initialState: State
		reducers: ValidateSliceCaseReducers<State, CaseReducers>
	}
) => {
	const slice = createSlice(state);
	const dispatchActions: {[key: string]: Function} = {};

	for (const key in slice.actions) {
		if (slice.actions.hasOwnProperty(key)) {
			// wrap action within store dispatch
			dispatchActions[key] = (...args: any[]) => {
				store.dispatch((slice.actions[key] as Function)(...args));
			}
		}
	}

	return {
		actions: slice.actions,
		caseReducers: slice.caseReducers,
		// add dispatch prop that pre-wraps actions within store dispatch
		dispatch: dispatchActions as typeof slice.actions,
		name: slice.name,
		reducer: slice.reducer,
	}
};

const slice = createSlicePlus({
	name: 'Example500',
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
		console.log('lalal');
		slice.dispatch.setLoading(true);
		await sleep(1000);
		slice.dispatch.increment(num);
		slice.dispatch.setLoading(false);
	}
)

export type ExampleStateType = ReturnType<typeof store.getState>;
export const useExampleSelector = useSelector as TypedUseSelectorHook<ExampleStateType>;
