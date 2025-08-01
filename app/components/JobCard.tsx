"use client";
import Link from "next/link";
import BookmarkButton from "./BookmarkButton";
import { Job } from "../data";

const JobCard = ({ job }: { job: Job }) => {
  const logoUrl = job.logoUrl;
  const categories = job.categories || [];
  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="card w-full bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 rounded-2xl">
        <div className="card-body">
          {/* Debug: Show raw JSON of jobs
          <pre className="bg-white p-4 rounded shadow mb-6 overflow-x-auto text-xs">
            {JSON.stringify(job, null, 2)}
          </pre> */}
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={`${job.title} logo`}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              ) : (
                <div className="w-[50px] h-[50px] bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm"></div>
              )}
              <div>
                <h2 className="card-title text-lg font-semibold">
                  {job.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {job.orgName} • {job.location || "Location not specified"}
                </p>
              </div>
            </div>
            <BookmarkButton job={job} bookmarked={job.isBookmarked} />
          </div>
          <p className="text-gray-600 mt-2 text-sm line-clamp-3">
            {job.description}
          </p>
          <div className="card-actions justify-start mt-4">
            <div className="badge badge-neutral badge-soft p-4 mr-4">
              {job.opType}
            </div>
            {categories.map((category) => (
              <div
                key={category}
                className="badge badge-soft badge-primary p-4"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default JobCard;
