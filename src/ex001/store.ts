import { configureStore, createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: `Example001`,
    initialState: {
        count: 1,
    },
    reducers: {},
});

/**
 * Foregoing rootReducer and instead passing the slice reducers directly to configureStore().
 */
export const store = configureStore({
    reducer: {
        example: slice.reducer,
    },
});

export type ExampleStateType = ReturnType<typeof store.getState>;
