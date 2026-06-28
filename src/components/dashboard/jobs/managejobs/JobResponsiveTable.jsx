import React from "react";
import JobActions from "./jobactions/JobActions";

const JobResponsiveTable = ({ jobs = [] }) => {
  // ১. ইউনিক কি (Key) ফরম্যাট করা
  const formattedJobs = jobs.map((job) => ({
    ...job,
    key: job._id?.$oid || job._id?.toString() || job._id,
  }));

  return (
    <>
      <div className="hidden md:block w-full rounded-xl border border-white/10 bg-transparent overflow-hidden">
        <table className="w-full bg-transparent text-sm text-left text-white border-collapse">
          <thead>
            <tr className="bg-white/5 text-xs font-semibold capitalize text-white tracking-wider border-b border-white/10">
              <th
                scope="col"
                className="capitalize px-6 py-4 font-semibold align-middle"
              >
                Job title
              </th>
              <th
                scope="col"
                className="capitalize px-6 py-4 font-semibold align-middle"
              >
                Type / Category
              </th>
              <th
                scope="col"
                className="capitalize px-6 py-4 font-semibold align-middle"
              >
                Location
              </th>
              <th
                scope="col"
                className="capitalize px-6 py-4 font-semibold align-middle"
              >
                Status
              </th>

              <th
                scope="col"
                className="text-center capitalize px-6 py-4 font-semibold align-middle"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5 bg-transparent">
            {formattedJobs.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-12 text-center text-white bg-transparent"
                >
                  No jobs found for this company.
                </td>
              </tr>
            ) : (
              formattedJobs.map((job) => (
                <tr
                  key={job.key}
                  className="hover:bg-white/5 transition-all duration-200 border-b border-white/5"
                >
                  {/* ১. Job Title */}
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-white align-middle">
                    {job.title}
                  </td>

                  {/* ২. Type & Category */}
                  <td className="whitespace-nowrap px-6 py-4 align-middle">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-gray-200">
                        {job.type}
                      </span>
                      <span className="text-xs text-gray-400">
                        {job.category}
                      </span>
                    </div>
                  </td>

                  {/* ৩. Location */}
                  <td className="whitespace-nowrap px-6 py-4 capitalize text-gray-300 align-middle">
                    {job.remote ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 text-xs font-medium text-purple-400">
                        Remote
                      </span>
                    ) : (
                      job.location || "N/A"
                    )}
                  </td>

                  {/* ৪. Status */}
                  <td className="whitespace-nowrap px-6 py-4 align-middle">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium capitalize border ${
                        job.status === "active"
                          ? "bg-green-500/10 border-green-500/20 text-green-400"
                          : "bg-red-500/10 border-red-500/20 text-red-400"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>

                  {/* ৫. Actions */}
                  <td className="whitespace-nowrap px-6 py-4 text-center align-middle">
                    <div className="inline-flex items-center justify-center w-full">
                      <JobActions jobId={job.key} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default JobResponsiveTable;
