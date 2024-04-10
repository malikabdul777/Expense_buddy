import { masterApiSlice } from "../masterApiSlice";

const signUpApi = masterApiSlice
  .enhanceEndpoints({ addTagTypes: ["SignUp"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllUsers: builder.query({
        query: () => "/auth/signup",
        providesTags: ["SignUp"],
      }),
      createUser: builder.mutation({
        query: (transaction) => ({
          url: "/auth/signup",
          method: "POST",
          body: transaction,
        }),
        invalidatesTags: ["SignUp"],
      }),
      deleteUser: builder.mutation({
        query: (id) => ({
          url: `/auth/signup/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["SignUp"],
      }),
      updateUser: builder.mutation({
        query: ({ id, updatedTransaction }) => ({
          url: `/auth/signup/${id}`,
          method: "PATCH",
          body: updatedTransaction,
        }),
        invalidatesTags: ["SignUp"],
      }),
    }),
  });

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = signUpApi;
