import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3000/api/v1",
    prepareHeaders: (headers) => {
      headers.set("Access-Control-Allow-Origin", "*");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      query: () => "/transactions",
    }),
  }),
});

export const { useGetAllTransactionsQuery } = transactionsApi;
