"use client";

import { useRouter } from "next/navigation";
import PostJobForm from "@/components/dashboard/jobs/PostJobForm";

const NewJobPage = () => {
  const router = useRouter();

  // TODO: replace with the recruiter's registered company from the session/backend.
  const company = {
    id: "company_1",
    name: "Acme Corp",
    status: "approved", // "approved" | "pending"
  };

  const handleSubmit = async (job) => {
    // TODO: POST `job` to your API, then redirect to the jobs list.
    // await fetch("/api/jobs", { method: "POST", body: JSON.stringify(job) });
    console.log("Creating job:", job);
    router.push("/dashboard/recruiter/jobs");
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <PostJobForm
        company={company}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/dashboard/recruiter/jobs")}
      />
    </div>
  );
};

export default NewJobPage;
