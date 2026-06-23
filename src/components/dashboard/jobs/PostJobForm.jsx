"use client";

import { useState } from "react";
import Link from "next/link";
import { Form, Button } from "@heroui/react";
import CompanyBanner from "./CompanyBanner";
import JobInfoSection from "./JobInfoSection";
import JobDescriptionSection from "./JobDescriptionSection";
import { validateJob } from "./validateJob";

const PostJobForm = ({
  company,
  cancelHref = "/dashboard/recruiter/jobs",
  onSubmit,
}) => {
  const [remote, setRemote] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const normalized_status = company?.status.toLowerCase();
  const isApproved = normalized_status === "approved";
  const canPost = isApproved;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canPost || submitting) return;

    const data = Object.fromEntries(new FormData(event.currentTarget));
    const job = {
      title: data.title.trim(),
      category: data.category,
      type: data.type,
      salary: {
        min: data.salaryMin ? Number(data.salaryMin) : null,
        max: data.salaryMax ? Number(data.salaryMax) : null,
        currency: data.currency,
      },
      remote,
      location: remote ? null : data.location.trim(),
      applicationDeadline: data.applicationDeadline,
      responsibilities: data.responsibilities.trim(),
      requirements: data.requirements.trim(),
      benefits: data.benefits?.trim() || null,
      companyId: company._id,
      company: company.name,
      companyLogo: company.logo,
      status: "active",
      visibility: "public",
    };

    setSubmitting(true);
    await onSubmit?.(job);
    setSubmitting(false);
  };

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border border-default bg-content1 p-5 sm:p-6">
      <div className="mb-6 border-b border-default pb-4">
        <h1 className="text-xl font-semibold text-foreground">
          Post A New Job
        </h1>
        <p className="mt-1 text-sm text-muted">
          Fill in the details below to publish a new opening for your company.
        </p>
      </div>

      <CompanyBanner company={company} isApproved={isApproved} />

      <Form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <JobInfoSection remote={remote} setRemote={setRemote} />
        <JobDescriptionSection />

        <div className="flex justify-end gap-3 border-t border-default pt-4">
          <Link href={cancelHref}>
            <Button
              type="button"
              variant="secondary"
              className="rounded-sm border border-white/30 bg-transparent text-white"
            >
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            isDisabled={submitting}
            className="rounded-sm bg-white font-bold text-black"
          >
            {submitting ? "Posting…" : "Post Job"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PostJobForm;
