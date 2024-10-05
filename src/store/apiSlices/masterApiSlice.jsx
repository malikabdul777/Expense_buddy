import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// initialize an empty api service that we'll inject endpoints into later as needed
export const masterApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://expense-buddy-server.onrender.com/api/v1",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get("access_token")}`);

      return headers;
    },
  }),
  endpoints: () => ({}),
});
