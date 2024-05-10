import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.weekday.technology",
  credentials: "same-origin",
});

const api = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: (_builder) => ({}),
});

export const {} = api;
export default api;
