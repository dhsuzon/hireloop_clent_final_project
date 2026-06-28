"use client";

import React from "react";
import PostJobForm from "@/components/dashboard/jobs/PostJobForm";
import { createJobs } from "@/lib/actions/job";
import { toast } from "react-toastify";

const NewJobPostClient = ({ company }) => {
  const handleSubmit = async (job) => {
    try {
      await createJobs(job);
      toast.success("Job posted successfully!");
    } catch (error) {
      toast.error("Failed to post job");
      console.error(error);
    }
  };
  const normalized_status = company?.status?.toLowerCase();
  const isApproved = normalized_status === "approved";

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {isApproved ? (
        <PostJobForm
          company={company}
          onSubmit={handleSubmit}
          cancelHref="/dashboard/recruiter/jobs"
        />
      ) : (
        <div className="mt-4 rounded-xl border border-warning/40 bg-warning/10 p-6 text-center text-warning">
          <p>
            Your company status is{" "}
            <strong>{company?.status || "pending"}</strong>. You must be
            approved by an admin to see the job posting form.
          </p>
        </div>
      )}
    </div>
  );
};

export default NewJobPostClient;
