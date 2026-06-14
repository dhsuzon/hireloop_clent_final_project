"use client";

import React, { useState } from "react";
import PostJobForm from "@/components/dashboard/jobs/PostJobForm";
import { createJobs } from "@/lib/actions/job";
import { toast } from "@heroui/react";

const NewJobPostClient = ({ company }) => {
  console.log("this is recruiter company", company);
  // 🟢 status বাদ দিয়ে isApproved: true (boolean) যোগ করা হলো
  // const [company] = useState({
  //   id: "company_1",
  //   name: "Acme Corp",
  //   isApproved: true,
  // });

  const handleSubmit = async (job) => {
    try {
      await createJobs(job);
      toast.success("Job posted successfully!");
    } catch (error) {
      toast.error("Failed to post job");
      console.error(error);
    }
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

export default NewJobPostClient;
