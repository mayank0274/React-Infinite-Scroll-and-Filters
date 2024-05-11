import { configureStore, Tuple } from "@reduxjs/toolkit";
import jobSlice from "./slices/jobs/jobSlice";
import api from "./api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    jobs: jobSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return new Tuple(...getDefaultMiddleware(), api.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
