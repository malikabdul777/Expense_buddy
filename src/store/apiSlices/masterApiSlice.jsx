import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed
export const masterApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:3000/api/v1" }),
  endpoints: () => ({}),
});
