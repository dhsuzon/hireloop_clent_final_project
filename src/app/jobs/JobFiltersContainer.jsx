"use client";

import React, { useState, useMemo, useEffect } from "react";
import JobFilters from "./JobFilters";
import JobCard from "@/components/dashboard/jobs/JobCard";
import { useRouter } from "next/navigation";
import { Pagination } from "@heroui/react";

const JobFiltersContainer = ({ jobs = [], filters, alljobs, totaljobs }) => {
  const [search, setSearch] = useState(filters.search);
  const [category, setCategory] = useState(filters.category || "all");
  const [jobType, setJobType] = useState(filters.type || "all");
  const [remoteOnly, setRemoteOnly] = useState(filters.remote || false);
  const router = useRouter();

  const [page, setPage] = useState(filters.page || 1);

  const totalItems = totaljobs;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    if (page > 3) {
      pages.push("ellipsis");
    }
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) {
      pages.push("ellipsis");
    }
    pages.push(totalPages);
    return pages;
  };
  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  // const filteredJobs = useMemo(() => {
  //   return jobs.filter((job) => {
  //     const matchSearch =
  //       !search ||
  //       job.title?.toLowerCase().includes(search.toLowerCase()) ||
  //       job.company?.toLowerCase().includes(search.toLowerCase());
  //     const matchCategory = category === "all" || job.category === category;
  //     const matchType = jobType === "all" || job.type === jobType;
  //     const matchRemote = !remoteOnly || job.remote === true;

  //     return matchSearch && matchCategory && matchType && matchRemote;
  //   });
  // }, [search, category, jobType, remoteOnly, jobs]);

  useEffect(() => {
    const sq = new URLSearchParams();
    if (search) {
      sq.set("search", search);
    }
    if (jobType !== "all") {
      sq.set("type", jobType);
    }
    if (category !== "all") {
      sq.set("category", category);
    }
    if (remoteOnly) {
      sq.set("remote", true);
    }
    if (page) {
      sq.set("page", page);
    }

    const path = `?${sq.toString()}`;
    router.push(path);
  }, [search, router, jobType, category, remoteOnly, page]);

  return (
    <>
      <JobFilters
        alljobs={alljobs}
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
          <Pagination className="w-full">
            <Pagination.Summary>
              Showing {startItem}-{endItem} of {totalItems} results
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={page === 1}
                  onPress={() => setPage((p) => p - 1)}
                >
                  <Pagination.PreviousIcon />
                  <span>Previous</span>
                </Pagination.Previous>
              </Pagination.Item>
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
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={page === totalPages}
                  onPress={() => setPage((p) => p + 1)}
                >
                  <span>Next</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 w-full">
          <div className="text-zinc-500 text-center">
            No job postings match your current filter selection.
          </div>
        </div>
      )}
    </>
  );
};

export default JobFiltersContainer;
