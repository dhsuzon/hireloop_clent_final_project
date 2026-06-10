
import JobActions from "./jobactions/JobActions";

const JobResponsiveTable = ({ jobs = [] }) => {
  return (
    <>
      <div className="block md:hidden space-y-4">
        {jobs.length === 0 ? (
          /* 🔄 HeroUI <Card> এবং <Card.Body> এর হুবহু বিকল্প */
          <div className="border border-white/5 bg-white/5 shadow-none rounded-xl p-6 text-center text-white">
            No jobs found for this company.
          </div>
        ) : (
          jobs.map((job) => {
            const jobId = job._id?.$oid || job._id?.toString() || job._id;

            return (
              /* 🔄 মূল <Card> এর বিকল্প (আপনার সব টেইলউইন্ড ক্লাস হুবহু সেম আছে) */
              <div
                key={jobId}
                className="border border-white/10 bg-white/5 shadow-none rounded-xl backdrop-blur-md flex flex-col"
              >
                {/* 🔄 <Card.Header> এর বিকল্প */}
                <div className="flex justify-between items-start p-4 pb-2">
                  <div className="flex flex-col text-left">
                    <h3 className="font-semibold text-base text-white tracking-wide">
                      {job.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {job.type} / {job.category}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize border ${
                      job.status === "active"
                        ? "bg-green-500/10 border-green-500/20 text-green-400"
                        : "bg-red-500/10 border-red-500/20 text-red-400"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>

                {/* 🔄 <Card.Body> এর বিকল্প */}
                <div className="p-4 pt-2 border-t border-white/5 flex flex-row justify-between items-center text-sm">
                  <span className="text-gray-300 capitalize font-medium">
                    {job.remote ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 text-xs font-medium text-purple-400">
                        Remote
                      </span>
                    ) : (
                      job.location || "N/A"
                    )}
                  </span>

                  {/* ক্লায়েন্ট অ্যাকশন বাটন কম্পোনেন্ট */}
                  <JobActions jobId={jobId} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default JobResponsiveTable;
