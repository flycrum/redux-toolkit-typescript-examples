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
		extraReducers: any
		initialState: State
		name: Name
		reducers: ValidateSliceCaseReducers<State, CaseReducers>
		thunks: any
	}
) => {
	const slice = createSlice(state);
	const dispatchActions: {[key: string]: Function} = {};
	const dispatchThunks: {[key: string]: Function} = {};

	for (const key in slice.actions) {
		if (slice.actions.hasOwnProperty(key)) {
			// wrap action within store dispatch
			dispatchActions[key] = (...args: any[]) => {
				return store.dispatch((slice.actions[key] as Function)(...args));
			}
		}
	}

	// for (const key in state.thunks) {
	// 	if (state.thunks.hasOwnProperty(key)) {
	// 		// wrap action within store dispatch
	// 		state.thunks[key] = createAsyncThunk(
	// 			`${state.name}\\${key}`,
	// 			state.thunks[key],
	// 		)
	// 	}
	// }

	for (const key in state.thunks) {
		if (state.thunks.hasOwnProperty(key)) {
			// wrap action within store dispatch
			dispatchThunks[key] = (...args: any[]) => {
				return store.dispatch((state.thunks[key] as Function)(...args));
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
		// thunks: state.thunks, // todo - work on typing
		// add request prop that pre-wraps thunks within store dispatch
		request: dispatchThunks as typeof state.thunks, // todo - work on typing
	}
};

function StoreExample500() {
	const name = StoreExample500.name;

	/**
	 * A thunk that directly and internally dispatches actions.
	 */
	const incrementAfterAsyncEffectThunk = createAsyncThunk(
		`${name}/incrementAfterAsyncEffectThunk`,
		// Declare the type your function argument here:
		async (num: number) => {
			slice.dispatch.setLoading(true);
			await sleep(1000);
			slice.dispatch.increment(num);
			slice.dispatch.setLoading(false);
		}
	)

	/**
	 * Another thunk that simply returns data and offloads handling of lifecycle to extraReducers and case builder.
	 */
	const decrementAfterAsyncEffectThunk = createAsyncThunk(
		`${name}/decrementAfterAsyncEffectThunk`,
		// Declare the type your function argument here:
		async (num: number) => {
			await sleep(1000);
			return num;
		}
	)

	const slice = createSlicePlus({
		name,
		initialState: {
			count: 0,
			isLoading: false,
			requestIdLast: undefined,
		},
		reducers: {
			increment(state, action: PayloadAction<number>) {
				state.count += action.payload;
			},
			setLoading(state, { payload: isLoading }: PayloadAction<boolean>) {
				state.isLoading = isLoading;
				// this does not handle queued requests and the loader will get cancelled out with back-to-back calls
			},
		},
		extraReducers(builder: any) { // todo - type
			builder.addCase(decrementAfterAsyncEffectThunk.pending, (state: any, {meta}: any) => {
				state.isLoading = true;
				state.requestIdLast = meta.requestId;
			})
			builder.addCase(decrementAfterAsyncEffectThunk.fulfilled, (state: any, {payload, meta}: any) => {
				state.count -= payload;

				// only do if latest request as this will prevent back-to-back calls colliding and stopping the loader prematurely
				if (meta.requestId === state.requestIdLast) {
					// if trying to call another action, it must be delayed (is there a better way of doing this?)
					setTimeout(() => slice.dispatch.setLoading(false));
				}
			})
			builder.addCase(decrementAfterAsyncEffectThunk.rejected, (state: any, {meta}: any) => {
				if (meta.requestId === state.requestIdLast) {
					state.isLoading = false;
				}
			})
		},
		/**
		 * Include thunks here to generate wrapped dispatches.
		 */
		thunks: {
			decrementAfterAsyncEffectThunk,
			incrementAfterAsyncEffectThunk,
		}
	});

	return {
		slice,
	}
}

export const storeExample500 = StoreExample500();

export const store = configureStore({
	reducer: {
		example: storeExample500.slice.reducer,
	},
});

export type ExampleStateType = ReturnType<typeof store.getState>;
export const useExampleSelector = useSelector as TypedUseSelectorHook<ExampleStateType>;
