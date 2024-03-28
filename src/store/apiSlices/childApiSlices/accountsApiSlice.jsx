import { masterApiSlice } from "../masterApiSlice";

const accountsApi = masterApiSlice
  .enhanceEndpoints({ addTagTypes: ["Accounts"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllAccounts: builder.query({
        query: () => "/accounts",
        providesTags: ["Accounts"],
      }),
      createAccount: builder.mutation({
        query: (account) => ({
          url: "/accounts",
          method: "POST",
          body: account,
        }),
        invalidatesTags: ["Accounts"],
      }),
      deleteAccount: builder.mutation({
        query: (id) => ({
          url: `/accounts/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Accounts"],
      }),
    }),
  });

export const {
  useGetAllAccountsQuery,
  useCreateAccountMutation,
  useDeleteAccountMutation,
} = accountsApi;
