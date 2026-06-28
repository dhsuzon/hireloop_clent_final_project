import ManageJobsTable from "@/components/dashboard/jobs/managejobs/ManageJobsTable";
import { getLoggedRecruiterCompany } from "@/lib/api/companies";
import { getCompanyJobs } from "@/lib/api/jobs";

const recruiterAllJobs = async () => {
  const company = await getLoggedRecruiterCompany();
  const jobs = await getCompanyJobs(company._id);
  return (
    <div className="container mx-auto py-8 px-4">
      <ManageJobsTable jobs={jobs} />
    </div>
  );
};

export default recruiterAllJobs;
