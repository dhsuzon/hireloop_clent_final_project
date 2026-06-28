"use client";

import React, { useState, useEffect } from "react";
import JobFilters from "./JobFilters";
import JobCard from "@/components/dashboard/jobs/JobCard";
import { useRouter } from "next/navigation";
import { Pagination } from "@heroui/react";

const JobFiltersContainer = ({
  jobs = [],
  filters,
  alljobs = [],
  totaljobs = 0,
}) => {
  const [search, setSearch] = useState(filters.search || "");
  const [category, setCategory] = useState(filters.category || "all");
  const [jobType, setJobType] = useState(filters.type || "all");
  const [remoteOnly, setRemoteOnly] = useState(filters.remote || false);
  const [page, setPage] = useState(Number(filters.page) || 1);
  const router = useRouter();

  useEffect(() => {
    setPage(1);
  }, [search, category, jobType, remoteOnly]);

  const totalItems = totaljobs;
  const itemsPerPage = 12;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    if (page > 3) pages.push("ellipsis");

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) pages.push("ellipsis");
    if (totalPages > 1) pages.push(totalPages);
    return [...new Set(pages)];
  };

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  useEffect(() => {
    const sq = new URLSearchParams();
    if (search) sq.set("search", search);
    if (jobType !== "all") sq.set("type", jobType);
    if (category !== "all") sq.set("category", category);
    if (remoteOnly) sq.set("remote", true);
    if (page) sq.set("page", page);

    router.push(`?${sq.toString()}`);
  }, [search, jobType, category, remoteOnly, page, router]);

  return (
    <>
      <JobFilters
        alljobs={Array.isArray(alljobs) ? alljobs : []} // এখানে সেফটি চেক
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        jobType={jobType}
        setJobType={setJobType}
        remoteOnly={remoteOnly}
        setRemoteOnly={setRemoteOnly}
      />

      {jobs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full">
            {jobs.map((job) => (
              <JobCard key={job._id} jobs={job} />
            ))}
          </div>

          <div className="mt-8">
            <Pagination className="w-full">
              <Pagination.Summary>
                Showing {startItem}-{endItem} of {totalItems} results
              </Pagination.Summary>

              <Pagination.Content>
                {/* Previous Button */}
                <Pagination.Item>
                  <Pagination.Previous
                    isDisabled={page === 1}
                    onPress={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <Pagination.PreviousIcon />
                    <span>Previous</span>
                  </Pagination.Previous>
                </Pagination.Item>

                {/* Page Numbers */}
                {getPageNumbers().map((p, i) =>
                  p === "ellipsis" ? (
                    <Pagination.Item key={`ellipsis-${i}`}>
                      <Pagination.Ellipsis />
                    </Pagination.Item>
                  ) : (
                    <Pagination.Item key={p}>
                      <Pagination.Link
                        isActive={p === page}
                        onPress={() => setPage(p)}
                      >
                        {p}
                      </Pagination.Link>
                    </Pagination.Item>
                  ),
                )}

                {/* Next Button */}
                <Pagination.Item>
                  <Pagination.Next
                    isDisabled={page === totalPages}
                    onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    <span>Next</span>
                    <Pagination.NextIcon />
                  </Pagination.Next>
                </Pagination.Item>
              </Pagination.Content>
            </Pagination>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-zinc-500">
          No job postings match your current filter selection.
        </div>
      )}
    </>
  );
};

export default JobFiltersContainer;
