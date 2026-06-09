"use client";

import { useState } from "react";
import { Form, Button } from "@heroui/react";
import CompanyBanner from "./CompanyBanner";
import JobInfoSection from "./JobInfoSection";
import JobDescriptionSection from "./JobDescriptionSection";
import { validateJob } from "./validateJob";

const PostJobForm = ({ company, onCancel, onSubmit }) => {
  const [remote, setRemote] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const isApproved = company?.status === "approved";
  const canPost = Boolean(company) && isApproved;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canPost || submitting) return;

    const data = Object.fromEntries(new FormData(event.currentTarget));

    const validationErrors = validateJob(data, { remote });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitError(null);

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
      // Auto-linked + published on submit.
      companyId: company.id,
      status: "active",
      visibility: "public",
    };

    try {
      setSubmitting(true);
      await onSubmit?.(job);
    } catch (err) {
      setSubmitError(
        err?.message ?? "Something went wrong while posting the job. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border border-default bg-content1 p-5 sm:p-6">
      <div className="mb-6 border-b border-default pb-4">
        <h1 className="text-xl font-semibold text-foreground">Post A New Job</h1>
        <p className="mt-1 text-sm text-muted">
          Fill in the details below to publish a new opening for your company.
        </p>
      </div>
      <CompanyBanner
        company={company}
        isApproved={isApproved}
        canPost={canPost}
      />
      <Form
        onSubmit={handleSubmit}
        validationBehavior="aria"
        validationErrors={errors}
        className="flex flex-col gap-8"
      >
        <JobInfoSection remote={remote} setRemote={setRemote} />
        <JobDescriptionSection />

        {submitError && (
          <div className="rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-danger">
            {submitError}
          </div>
        )}

        <div className="flex justify-end gap-3 border-t border-default pt-4">
          <Button
            type="button"
            variant="secondary"
            onPress={onCancel}
            isDisabled={submitting}
            className="rounded-sm border border-white/30 bg-transparent text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isDisabled={!canPost || submitting}
            className="rounded-sm bg-white font-bold text-black hover:bg-white/90"
          >
            {submitting ? "Posting…" : "Post Job"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PostJobForm;
