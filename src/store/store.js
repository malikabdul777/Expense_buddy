import { configureStore } from "@reduxjs/toolkit";
import { transactionsApi } from "./apiSlices/transactionsApiSlice";

export const store = configureStore({
  reducer: { [transactionsApi.reducerPath]: transactionsApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(transactionsApi.middleware),
});
