import { getJobs } from "@/lib/api/jobs";
import JobFiltersContainer from "./JobFiltersContainer";

const JobPage = async ({ searchParams }) => {
  // ১. প্যারামিটার গ্রহণ
  const filters = await searchParams;

  // ডিফল্ট পেজ হ্যান্ডেল করা
  const currentPage = filters.page || "1";

  const filtersObj = {
    ...filters,
    page: currentPage,
    remote: filters.remote === "true" ? true : false,
  };

  // ২. কুয়েরি স্ট্রিং তৈরি
  const searchQurey = new URLSearchParams({ ...filters, page: currentPage });
  const qureyString = searchQurey.toString();

  // ৩. ডাটা ফেচিং
  // ব্যাকএন্ড এখন সব ক্ষেত্রেই { perjobs, totaljobs } রিটার্ন করবে
  const allData = await getJobs(""); // সব জব
  const paginatedData = await getJobs(qureyString); // ফিল্টার করা জব

  // ৪. ডাটা সেফটি (এরর এড়াতে ডিফল্ট ভ্যালু)
  const alljobs = Array.isArray(allData?.perjobs) ? allData.perjobs : [];
  const perjobs = Array.isArray(paginatedData?.perjobs)
    ? paginatedData.perjobs
    : [];
  const totaljobs = paginatedData?.totaljobs || 0;

  return (
    <div className="min-h-screen bg-zinc-950 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Explore Opportunities
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Current open roles tailored for you.
          </p>
          {/* এখন আর perjobs.length নিয়ে ক্রাশ করবে না */}
          <p className="text-white/60 text-sm mt-2">
            Showing {perjobs.length} jobs
          </p>
        </header>

        <JobFiltersContainer
          alljobs={alljobs}
          jobs={perjobs}
          filters={filtersObj}
          totaljobs={totaljobs}
        />
      </div>
    </div>
  );
};

export default JobPage;
