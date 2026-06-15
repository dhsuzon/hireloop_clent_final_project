import React from "react";
import { Card } from "@heroui/react";
import { Pin, Briefcase, CircleDollar, ArrowRight } from "@gravity-ui/icons";
import Link from "next/link";
import Image from "next/image";

const JobCard = ({ jobs }) => {
  if (!jobs)
    return <div className="text-zinc-500 text-sm">Loading job details...</div>;

  const {
    _id,
    title = "Untitled Position",
    responsibilities = "",
    requirements = "",
    benefits = "",
    company = "Company",
    companyLogo = "",
    remote = false,
    location = "Global",
    type = "Full Time",
    salary = { min: 0, max: 0, currency: "USD" },
  } = jobs;

  const formatSalary = (min, max, currency) => {
    if (!min || !max) return "Salary Negotiable";
    const symbol = currency === "USD" ? "$" : "€";
    return `${symbol}${min / 1000}k–${symbol}${max / 1000}k/year`;
  };

  return (
    <Card className="max-w-105 w-full bg-[#121212] border border-zinc-800/50 text-white p-6 rounded-[28px] shadow-2xl">
      {/* HEADER SECTION */}
      <Card.Header className="flex flex-col items-start gap-3 p-0 pb-4">
        {/* Company Identity */}
        <div className="flex items-center gap-2.5">
          {companyLogo && (
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white p-0.5 flex items-center justify-center">
              <Image
                src={companyLogo}
                alt={`${company} logo`}
                width={40}
                height={40}
                className="object-cover w-auto h-auto rounded-full"
                loading="eager"
              />
            </div>
          )}
          <span className="text-zinc-400 text-lg font-medium tracking-wide">
            {company}
          </span>
        </div>

        {/* Job Title */}
        <Card.Title className="text-2xl font-bold tracking-tight capitalize text-white mt-1 text-wrap leading-8">
          {title}
        </Card.Title>

        {/* Job Description / Responsibilities */}
        {responsibilities && (
          <Card.Description className="text-zinc-400 text-[15px] leading-relaxed font-normal mt-1">
            {responsibilities}
          </Card.Description>
        )}
      </Card.Header>

      {/* CONTENT / BADGES & EXTRA DETAILS SECTION */}
      <Card.Content className="p-0 flex flex-col gap-4 mt-2">
        {/* Inline Badges row */}
        <div className="flex flex-wrap gap-2.5">
          {/* Location / Remote Badge */}
          <div className="flex items-center gap-2 bg-zinc-800/60 px-3.5 py-2 rounded-full text-[14px] font-medium text-zinc-200">
            <Pin className="text-[#f472b6] w-4 h-4" />
            <span>{remote ? "Remote" : location || "On-site"}</span>
          </div>

          {/* Job Type Badge */}
          <div className="flex items-center gap-2 bg-zinc-800/60 px-3.5 py-2 rounded-full text-[14px] font-medium text-zinc-200">
            <Briefcase className="text-[#f472b6] w-4 h-4" />
            <span>{type}</span>
          </div>
        </div>

        {/* Salary Badge Row */}
        <div className="flex">
          <div className="flex items-center gap-2 bg-zinc-800/60 px-3.5 py-2 rounded-full text-[14px] font-medium text-zinc-200">
            <CircleDollar className="text-[#f472b6] w-4 h-4" />
            <span>{formatSalary(salary.min, salary.max, salary.currency)}</span>
          </div>
        </div>

        {/* Requirements & Benefits Section */}
        <div className="mt-2 flex flex-col gap-3.5 border-t border-zinc-800/50 pt-4">
          {requirements && (
            <div>
              <h4 className="text-base font-medium text-zinc-500 capitalize tracking-wider mb-1">
                Requirements
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {requirements}
              </p>
            </div>
          )}
          {benefits && (
            <div>
              <h4 className="text-base  font-medium text-zinc-500 capitalize tracking-wider mb-1">
                Benefits
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {benefits}
              </p>
            </div>
          )}
        </div>
      </Card.Content>

      {/* FOOTER ACTION SECTION */}
      <Card.Footer className="p-0 pt-6 mt-4 flex justify-start">
        <Link
          href={`/jobs/${_id}`}
          className="group flex items-center gap-2 text-white text-[16px] font-medium hover:text-zinc-300 transition-colors"
        >
          Apply Now
          <ArrowRight className="text-[#f472b6] w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default JobCard;
