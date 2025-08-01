import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { Job } from "../data"

interface Tranform {
    success: boolean,
    message: string,
    data: Job[],
    error: any,
    count: number,
}

interface TransformId {
    success: boolean,
    message: string,
    data: Job,
    error: any,
    count: number, 
}

interface Bookmark {
    success: boolean,
    message: string,
    data: Job[]
}

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://akil-backend.onrender.com/',
  prepareHeaders: async (headers) => {
    const session = await getSession();
    const accessToken = (session && (session as any).user && (session as any).user.accessToken) || (session && (session as any).accessToken);
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const jobsApi = createApi({
    reducerPath: "jobsApi",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getJobs: builder.query<Job[], string | void>({
            query: () => `/opportunities/search`,
            transformResponse: (response: Tranform) => response.data,
        }),
        getJobsById: builder.query<Job, string>({
            query: (id: string) => `/opportunities/${id}`,
            transformResponse: (response: TransformId) => response.data,
        }),
        getBookmarks: builder.query<Job[], void>({
            query: () => `/bookmarks`,
            transformResponse: (response: Bookmark) => response.data,
        }),
        addBookmark: builder.mutation<Job[], Job>({
            query: (job: Job) => ({
                url: `/bookmarks/${job.id}`,
                method: "POST",
                body: job,
            }),
        }),
        removeBookmark: builder.mutation<any, string>({
            query: (id: string) => ({
                url: `/bookmarks/${id}`,
                method: "DELETE",
            }), 
        }),
    }),
});

export const { useGetJobsQuery, useGetJobsByIdQuery, useGetBookmarksQuery, useAddBookmarkMutation, useRemoveBookmarkMutation } = jobsApi;