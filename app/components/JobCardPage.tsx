"use client";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useGetJobsQuery } from "../services/apiSlice";
import JobCard from "./JobCard";
import { useState } from "react";

export default function JobCardPage() {
  const { data: jobs, error, isLoading } = useGetJobsQuery();
  const router = useRouter();

  const handleLogout = async () => {
    if (confirm("Are you sure? ")) {
      await signOut({
        callbackUrl: "/login",
        redirect: true,
      });
    } else return;
  };

  const [loading, setLoading] = useState(false);
  const handleShowBookmark = () => {
    setLoading(true);
    router.push("/bookmark");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-dots loading-xl"></div>
      </div>
    );
  }

  if (error) {
    const errorMessage =
      "data" in error && typeof error.data === "string"
        ? error.data
        : "status" in error
        ? `Request failed with status ${error.status}`
        : "Something went wrong. Please try again.";

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="alert alert-error text-center mb-4 w-full max-w-sm p-5">
          {errorMessage}
        </div>
        <button
          className="btn btn-error w-full max-w-sm"
          onClick={() => {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }}
        >
          Reload Page
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold mb-2">Opportunities</h1>
          <label className="select select-bordered w-full max-w-xs">
            <span className="label">Sort</span>
            <select>
              <option value="relevant">Relevant</option>
              <option value="name">Name</option>
              <option value="date_added">Date Added</option>
            </select>
          </label>
          <button
            className="btn btn-outline btn-error my-4"
            onClick={handleLogout}
          >
            Log out
          </button>
          <button
            className="btn btn-outline btn-info"
            onClick={handleShowBookmark}
          >
            Show Bookmarks
          </button>
        </div>
        <p className="text-gray-600 mb-6">
          Showing {jobs?.length || 0} results
        </p>
        <div className="grid grid-cols-1 gap-6">
          {jobs && jobs.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      </div>
    </div>
  );
}
