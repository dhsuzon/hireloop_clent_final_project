import JobResponsiveTableCard from "./JobResponsiveTableCard";
import JobResponsiveTable from "./JobResponsiveTable";

const ManageJobsTable = ({ jobs }) => {
  return (
    <div className="w-full p-6 bg-transparent rounded-xl border border-white/10 backdrop-blur-md">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Manage All Jobs
        </h1>
        <p className="text-sm text-white mt-1">
          View, update and manage your current job postings
        </p>
      </div>
      <JobResponsiveTableCard jobs={jobs} />
      <JobResponsiveTable jobs={jobs} />
    </div>
  );
};
export default ManageJobsTable;
