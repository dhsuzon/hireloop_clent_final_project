"use client";

import React, { useId } from "react";
// 💡 শুধু Table ইম্পোর্ট করা হলো (আপনার ডক্সের অ্যানাটমি অনুযায়ী)
import { Table } from "@heroui/react";
import Image from "next/image";
import Briefcase from "@gravity-ui/icons/Briefcase";

// রিলেティブ টাইম ফরম্যাটার
const getRelativeTime = (dateInput) => {
  if (!dateInput) return "Recent";
  const dateStr = dateInput?.$date || dateInput;
  const appliedDate = new Date(dateStr);
  const now = new Date();
  const diffInMs = now - appliedDate;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24)
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7)
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  return appliedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

// স্ট্যাটাস পিল কালার স্কিম
const statusStyles = {
  applied: "border-zinc-700 text-zinc-100 bg-zinc-900/50",
  review: "border-amber-500/40 text-amber-500 bg-amber-500/5",
  shortlisted: "border-emerald-500/40 text-emerald-500 bg-emerald-500/5",
  rejected: "border-rose-500/40 text-rose-500 bg-rose-500/5",
  offered: "border-zinc-400 text-zinc-300 bg-zinc-800/40",
};

const ApplicationsTableClient = ({ applications = [] }) => {
  const tableTitleId = useId();

  return (
    <div className="w-full rounded-xl border border-zinc-800/80 bg-[#121214] overflow-hidden shadow-2xl block">
      <h2 id={tableTitleId} className="sr-only">
        Job Applications History Table
      </h2>

      {/* 💡 ক্লাসনেমস দিয়ে উইডথ এবং ব্যাকগ্রাউন্ড রেন্ডার সেফ করা হলো */}
      <Table className="w-full border-collapse">
        {/* 💡 ডক্সের হুবহু অ্যানাটমি অনুযায়ী ScrollContainer ব্যবহার করা হলো */}
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Job Applications Overview"
            aria-labelledby={tableTitleId}
          >
            {/* টেবিল হেডার */}
            <Table.Header className="bg-[#161619] border-b border-zinc-800">
              <Table.Column
                isRowHeader
                className="text-zinc-400 font-medium text-xs py-3.5 pl-5 text-left w-[40%] bg-transparent"
              >
                Job Title
              </Table.Column>
              <Table.Column className="text-zinc-400 font-medium text-xs py-3.5 text-left w-[20%] bg-transparent">
                Company
              </Table.Column>
              <Table.Column className="text-zinc-400 font-medium text-xs py-3.5 text-left w-[15%] bg-transparent">
                Applied
              </Table.Column>
              <Table.Column className="text-zinc-400 font-medium text-xs py-3.5 text-left w-[15%] bg-transparent">
                Status
              </Table.Column>
              <Table.Column className="text-zinc-400 font-medium text-xs py-3.5 text-right pr-5 w-[10%] bg-transparent">
                Action
              </Table.Column>
            </Table.Header>

            {/* টেবিল বডি লুপ */}
            <Table.Body>
              {applications.length === 0 ? (
                <Table.Row>
                  <Table.Cell
                    colSpan={5}
                    className="py-12 text-center text-zinc-500 text-sm"
                  >
                    No applications found.
                  </Table.Cell>
                </Table.Row>
              ) : (
                applications.map((app, index) => {
                  const rowId =
                    app._id?.$oid || app._id || `fallback-row-id-${index}`;

                  const joinedJob = app.jobId || app.jobDetails || {};
                  const joinedCompany = joinedJob.companyId || {};

                  const displayJobTitle =
                    joinedJob.jobTitle || app.jobTitle || "Untitled Role";
                  const displayCompanyName =
                    joinedCompany.companyName ||
                    joinedJob.companyName ||
                    app.companyName ||
                    "Unknown Company";
                  const displayJobType =
                    joinedJob.jobType || app.jobType || "Full-time";
                  const displayWorkplaceMode =
                    joinedJob.workplaceMode || app.workplaceMode || "Remote";
                  const displayStatus = (
                    joinedJob.status ||
                    app.status ||
                    "Applied"
                  ).toLowerCase();
                  const companyLogoUrl =
                    joinedCompany.companyLogo ||
                    joinedJob.companyLogo ||
                    app.companyLogo;

                  return (
                    <Table.Row
                      key={rowId}
                      className="border-b border-zinc-800/50 hover:bg-zinc-900/20 transition-colors duration-150"
                    >
                      {/* ১. Job Title & Logo */}
                      <Table.Cell className="py-4 pl-5">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center size-10 rounded-lg bg-zinc-800/60 text-zinc-400 border border-zinc-700/30 shrink-0 overflow-hidden relative">
                            {companyLogoUrl ? (
                              <Image
                                src={companyLogoUrl}
                                alt={`${displayCompanyName} logo`}
                                fill
                                sizes="40px"
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              <Briefcase className="size-5" />
                            )}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-medium text-zinc-200 text-sm md:text-[15px] truncate">
                              {displayJobTitle}
                            </span>
                            <span className="text-xs text-zinc-500 mt-0.5 font-normal whitespace-nowrap">
                              {displayJobType} • {displayWorkplaceMode}
                            </span>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* ২. Company Name */}
                      <Table.Cell className="text-zinc-300 text-sm py-4 font-normal">
                        <span className="block truncate max-w-30 md:max-w-none">
                          {displayCompanyName}
                        </span>
                      </Table.Cell>

                      {/* ৩. Applied Time */}
                      <Table.Cell className="text-zinc-400 text-sm py-4 font-normal whitespace-nowrap">
                        {getRelativeTime(app.createAt)}
                      </Table.Cell>

                      {/* ৪. Status Pill */}
                      <Table.Cell className="py-4">
                        <span
                          className={`inline-flex items-center px-3 py-0.5 text-xs font-semibold rounded-full border tracking-wide capitalize text-[11px] ${statusStyles[displayStatus] || statusStyles.applied}`}
                        >
                          {app.status || "Applied"}
                        </span>
                      </Table.Cell>

                      {/* ৫. Details Action */}
                      <Table.Cell className="py-4 text-right pr-5">
                        <button
                          className="text-zinc-400 hover:text-zinc-100 font-medium text-sm transition-colors duration-150 bg-transparent outline-none focus:outline-none"
                          onClick={() => console.log(`Viewing: ${rowId}`)}
                          aria-label={`View details for ${displayJobTitle}`}
                        >
                          Details
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer />
      </Table>
    </div>
  );
};

export default ApplicationsTableClient;
