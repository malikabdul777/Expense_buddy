import { masterApiSlice } from "../masterApiSlice";

const chatApi = masterApiSlice
  .enhanceEndpoints({ addTagTypes: ["Chat"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      postChat: builder.mutation({
        query: (prompt) => ({
          url: "/chat",
          method: "POST",
          body: prompt,
        }),
        invalidatesTags: ["Chat"],
      }),
    }),
  });

export const { usePostChatMutation } = chatApi;
