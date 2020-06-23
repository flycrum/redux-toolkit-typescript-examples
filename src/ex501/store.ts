import {
	AsyncThunkAction,
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

// type ValueOf<T> = T[keyof T];
// type ReplaceReturnType<T extends (...a: any) => any, TNewReturn> = (...a: Parameters<T>) => TNewReturn;
// type ThunkWithDispatchReturnType<T> = T;
// type MapResultToPromise<T> = T extends (...args: infer U) => infer R ? (...args: U) => Promise<R> : T;
// type ThunkWithDispatchReturnType<T> = T extends (...args: infer U) => infer R ? (...args: U) => Promise<R> : (...args: any) => Promise<T>;
//AsyncThunkAction<number, { num: number; delay: number }, {}>

type ArgumentTypes<T> = T extends (... args: infer U ) => infer R ? U: never;
type ReplaceReturnType<T, TNewReturn> = (...a: ArgumentTypes<T>) => TNewReturn;
// modify mapped object of functions to return an async thunk dispatch so the 'abort' function on it is typed
type ThunkWithDispatchReturnType<T> = { [P in keyof T]: ReplaceReturnType<T[P], ReturnType<AsyncThunkAction<any, any, any>>> }

const createSlicePlus = <State, CaseReducers extends SliceCaseReducers<State>, Thunks, Name extends string = string>(
	state: {
		extraReducers: any
		initialState: State
		name: Name
		reducers: ValidateSliceCaseReducers<State, CaseReducers>
		// type as passed-in object of Thunks but visualize as functions
		thunks: Thunks & {[key: string]: Function}
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

	for (const key in state.thunks) {
		// @ts-ignore
		if (state.thunks.hasOwnProperty(key)) {
			// wrap action within store dispatch
			dispatchThunks[key] = (...args: any[]) => {
				return store.dispatch((state.thunks[key] as unknown as Function)(...args));
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
		thunks: state.thunks,
		// add request prop that pre-wraps thunks within store dispatch
		// request: dispatchThunks as typeof state.thunks,
		request: dispatchThunks as ThunkWithDispatchReturnType<typeof state.thunks>,
	}
};

function SliceExample500() {
	const name = SliceExample500.name;

	/**
	 * An object list of thunks.
	 * Note: this must be defined before the slice so it can be properly referenced.
	 */
	const thunks = {
		decrementAfterAsyncEffectThunk: createAsyncThunk(
			`${name}/decrementAfterAsyncEffectThunk`,
			// Declare the type your function argument here:
			async (payload: {num: number, delay: number}) => {
				await sleep(payload.delay);
				return payload.num;
			}
		),
		incrementAfterAsyncEffectThunk: createAsyncThunk(
			`${name}/incrementAfterAsyncEffectThunk`,
			// Declare the type your function argument here:
			async (payload: {num: number, delay: number}) => {
				slice.dispatch.setLoading(true);
				await sleep(payload.delay);
				slice.dispatch.increment(payload.num);
				slice.dispatch.setLoading(false);
			}
		),
	};

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
			reset(state) {
				state.count = 0;
				state.isLoading = false;
			},
			setLoading(state, { payload: isLoading }: PayloadAction<boolean>) {
				state.isLoading = isLoading;
				// this does not handle queued requests and the loader will get cancelled out with back-to-back calls
			},
		},
		extraReducers(builder: any) { // todo - type
			builder.addCase(thunks.decrementAfterAsyncEffectThunk.pending, (state: any, {meta}: any) => {
				state.isLoading = true;
				state.requestIdLast = meta.requestId;
			})
			builder.addCase(thunks.decrementAfterAsyncEffectThunk.fulfilled, (state: any, {payload, meta}: any) => {
				state.count -= payload;

				// only do if latest request as this will prevent back-to-back calls colliding and stopping the loader prematurely
				if (meta.requestId === state.requestIdLast) {
					// if trying to call another action, it must be delayed (is there a better way of doing this?)
					setTimeout(() => slice.dispatch.setLoading(false));
				}
			})
			builder.addCase(thunks.decrementAfterAsyncEffectThunk.rejected, (state: any, {meta}: any) => {
				if (meta.requestId === state.requestIdLast) {
					state.isLoading = false;
				}
			})
		},
		thunks,
	});

	return slice;
}

export const sliceExample500 = SliceExample500();

export const store = configureStore({
	reducer: {
		example: sliceExample500.reducer,
	},
});

export const useExampleSelector = useSelector as TypedUseSelectorHook<ReturnType<typeof store.getState>>;

// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types
