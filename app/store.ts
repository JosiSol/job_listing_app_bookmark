import { configureStore } from "@reduxjs/toolkit";
import { jobsApi } from "./services/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";


export const store = configureStore({
    reducer: {
        [jobsApi.reducerPath]: jobsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(jobsApi.middleware),
});

setupListeners(store.dispatch);