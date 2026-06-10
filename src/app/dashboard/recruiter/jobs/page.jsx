import ManageJobsTable from "@/components/dashboard/jobs/managejobs/ManageJobsTable";
import { getCompanyJobs } from "@/lib/api/jobs";


const recruiterAllJobs = async () => {

  const companyId = "company_1";
  const jobs = (await getCompanyJobs(companyId)) || [];
  return (
    <div className="container mx-auto py-8 px-4">
      <ManageJobsTable jobs={jobs} />
    </div>
  );
};

export default recruiterAllJobs;
