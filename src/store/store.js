import { configureStore } from "@reduxjs/toolkit";
// import { transactionsApi } from "./apiSlices/transactionsApiSlice";
// import { accountsApi } from "./apiSlices/accountsApiSlice";

import { masterApiSlice } from "./apiSlices/masterApiSlice";

export const store = configureStore({
  reducer: {
    // [transactionsApi.reducerPath]: transactionsApi.reducer,
    // [accountsApi.reducerPath]: accountsApi.reducer,
    [masterApiSlice.reducerPath]: masterApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(masterApiSlice.middleware),
});
