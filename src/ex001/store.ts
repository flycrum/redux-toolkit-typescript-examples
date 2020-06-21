import { configureStore, createSlice } from '@reduxjs/toolkit';

/**
 * Foregoing rootReducer and instead passing the slice reducers directly to configureStore().
 */
export const store = configureStore({
    reducer: {
        example: createSlice({
			name: `Example001`,
			initialState: {
				count: 1,
			},
			reducers: {},
		}).reducer,
    },
});

export type ExampleStateType = ReturnType<typeof store.getState>;
