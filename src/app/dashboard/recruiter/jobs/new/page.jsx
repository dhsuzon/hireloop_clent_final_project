"use client";

import PostJobForm from "@/components/dashboard/jobs/PostJobForm";
import { createJobs } from "@/lib/actions/job";
import { toast } from "@heroui/react";

const NewJobPage = () => {
  // TODO: replace with the recruiter's registered company from the session/backend.
  const company = {
    id: "company_1",
    name: "Acme Corp",
    status: "approved", // "approved" | "pending"
  };

  const handleSubmit = async (job) => {
    toast.success("Job posted successfully!");
    await createJobs(job);
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <PostJobForm
        company={company}
        onSubmit={handleSubmit}
        cancelHref="/dashboard/recruiter/jobs"
      />
    </div>
  );
};

export default NewJobPage;
