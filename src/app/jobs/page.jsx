import { getJobs } from "@/lib/api/jobs";
import JobFiltersContainer from "./JobFiltersContainer";

const JobPage = async () => {
  const jobs = await getJobs();

  return (
    <div className="min-h-screen bg-zinc-950 p-6 md:p-10">
      {/* Centered content wrapper to maintain structural constraint */}
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Explore Opportunities
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Current open roles tailored for you.
          </p>
        </header>

        {/* Dynamic client filter shell handles input state and 3-column rendering loop */}
        <JobFiltersContainer jobs={jobs} />
      </div>
    </div>
  );
};

export default JobPage;
