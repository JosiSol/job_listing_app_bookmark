"use client";

import Link from "next/link";
import { useGetBookmarksQuery } from "../services/apiSlice";
import JobCard from "../components/JobCard";

export default function BookmarksPage() {
  const { data: bookmarkedJobs, error, isLoading } = useGetBookmarksQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-dots loading-xl"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div
          role="alert"
          className="alert alert-error text-center mb-4 w-full max-w-sm p-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Failed to load Bookmarks</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-6 mb-6">
          <h1 className="text-3xl font-bold mb-2">Saved Bookmarks</h1>
          <Link href="/" className="btn btn-outline btn-secondary mr-4">
            ← Back to Opportunities
          </Link>
        </div>

        {bookmarkedJobs && bookmarkedJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {bookmarkedJobs.map((job: any) => {
              const jobId = job.id || job.eventID;
              if (!jobId) return null;
              const jobWithId = job.id ? job : { ...job, id: job.eventID };
              return <JobCard key={jobId} job={jobWithId} />;
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div
              role="alert"
              className="alert alert-warning text-center mb-4 w-full max-w-sm p-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>You haven't bookmarked any jobs yet.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
