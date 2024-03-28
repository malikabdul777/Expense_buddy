import { masterApiSlice } from "../masterApiSlice";

const transactionsApi = masterApiSlice
  .enhanceEndpoints({ addTagTypes: ["Transaction"] })
  .injectEndpoints({
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
