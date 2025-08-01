"use client";
import { useGetJobsByIdQuery } from "@/app/services/apiSlice";
import { useParams } from "next/navigation";
import {
  FaRegCalendarAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaClock,
  FaRegBuilding,
  FaCalendarCheck,
} from "react-icons/fa";

const formatDate = (dateString: string | undefined | null): string => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (e) {
    return "Invalid Date";
  }
};

export default function JobDetailsPage() {
  const params = useParams();
  const jobId = params.jobId as string;

  const { data: job, error, isLoading } = useGetJobsByIdQuery(jobId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-dots loading-xl"></div>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching job details:", error);
    const errorMessage =
      "data" in error && typeof error.data === "string"
        ? error.data
        : "status" in error
        ? `Request failed with status ${error.status}`
        : "Something went wrong. Please try again.";

    return <div className="alert alert-error">{errorMessage}</div>;
  }

  if (!job) {
    return <div className="bg-error text-center py-10">Job not found.</div>;
  }

  const jobCategories = job.categories ?? [];
  const jobRequired = job.requiredSkills ?? [];
  const jobRes =
    job.responsibilities?.split("\n").filter((line) => line.trim() !== "") ??
    [];

  return (
    <div className="bg-base-200 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {job.title || "Applicant Dashboard"}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          <div className="md:col-span-2">
            <div>
              <h2 className="text-xl font-bold mb-2">Description</h2>
              {job.description ? (
                <p className="text-gray-600">{job.description}</p>
              ) : (
                <p className="text-gray-500 italic">
                  No description available.
                </p>
              )}
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-bold mb-3">Responsibilities</h2>
              {jobRes.length > 0 ? (
                <ul className="space-y-2">
                  {jobRes.map((resp, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheckCircle className="text-green-500 mt-1 mr-3" />
                      <span className="text-gray-600">{resp}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">
                  No responsibilities listed.
                </p>
              )}
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">
                Ideal Candidate We Want
              </h2>
              {job.idealCandidate ? (
                <p className="text-gray-600 mb-3">{job.idealCandidate}</p>
              ) : (
                <p className="text-gray-500 italic">
                  No ideal candidate description available.
                </p>
              )}
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">When & Where</h2>
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-3" />
                <span>{job.whenAndWhere || "N/A"}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-50 p-4 rounded-2xl border">
              <h3 className="text-lg font-bold mb-4">About</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-center">
                  <FaClock className="mr-3 text-blue-500" />{" "}
                  <strong>Posted On:</strong>{" "}
                  <span className="ml-auto text-xs">
                    {formatDate(job.datePosted)}
                  </span>
                </li>
                <li className="flex items-center">
                  <FaRegCalendarAlt className="mr-3 text-red-500" />{" "}
                  <strong>Deadline:</strong>{" "}
                  <span className="ml-auto text-xs">
                    {formatDate(job.deadline)}
                  </span>
                </li>
                <li className="flex items-center">
                  <FaMapMarkerAlt className="mr-3 text-green-500" />{" "}
                  <strong>Location:</strong>{" "}
                  <span className="ml-auto text-xs">
                    {job.location?.join(", ") || "N/A"}
                  </span>
                </li>
                <li className="flex items-center">
                  <FaRegBuilding className="mr-3 text-purple-500" />{" "}
                  <strong>Start Date:</strong>{" "}
                  <span className="ml-auto text-xs">
                    {formatDate(job.startDate)}
                  </span>
                </li>
                <li className="flex items-center">
                  <FaCalendarCheck className="mr-3 text-orange-500" />{" "}
                  <strong>End Date:</strong>{" "}
                  <span className="ml-auto text-xs">
                    {formatDate(job.endDate)}
                  </span>
                </li>
              </ul>
            </div>

            <div className="my-6">
              <h3 className="text-lg font-bold mb-2">Categories</h3>
              <div className="flex flex-wrap gap-6">
                {jobCategories.length > 0 ? (
                  jobCategories.map((cat) => (
                    <div
                      key={cat}
                      className="badge badge-accent badge-soft font-bold text-xs p-4"
                    >
                      {cat}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic text-xs">
                    No categories listed.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {jobRequired.length > 0 ? (
                  jobRequired.map((skill) => (
                    <div
                      key={skill}
                      className="badge badge-info badge-soft text-xs font-bold p-4"
                    >
                      {skill}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic text-xs">
                    No skills listed.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
