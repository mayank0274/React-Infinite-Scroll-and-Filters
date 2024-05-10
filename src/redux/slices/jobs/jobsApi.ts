import api from "../../api";

const jobsEndPoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.mutation({
      query: (data) => ({
        headers: {
          "Content-Type": "application/json",
        },
        url: "adhoc/getSampleJdJSON",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetJobsMutation } = jobsEndPoints;
