import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3000/api/v1",
  }),
  tagTypes: ["Transaction"],
  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      query: () => "/transactions",
      providesTags: ["Transaction"],
    }),
    createTransaction: builder.mutation({
      query: (transaction) => ({
        url: "/transactions",
        method: "POST",
        body: transaction,
      }),
      invalidatesTags: ["Transaction"],
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transaction"],
    }),
    updateTransaction: builder.mutation({
      query: ({ id, updatedTransaction }) => ({
        url: `/transactions/${id}`,
        method: "PATCH",
        body: updatedTransaction,
      }),
      invalidatesTags: ["Transaction"],
    }),
  }),
});

export const {
  useGetAllTransactionsQuery,
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
} = transactionsApi;
