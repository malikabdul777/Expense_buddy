import { masterApiSlice } from "../masterApiSlice";

const signInApi = masterApiSlice
  .enhanceEndpoints({ addTagTypes: ["SignIn"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      signInUser: builder.mutation({
        query: (transaction) => ({
          url: "/auth/signin",
          method: "POST",
          body: transaction,
        }),
        invalidatesTags: ["SignIn"],
      }),
    }),
  });

export const { useSignInUserMutation } = signInApi;
