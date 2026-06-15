"use client";

import { useState } from "react";
import {
  Form,
  Button,
  TextField,
  Label,
  Input,
  TextArea,
  Description,
  FieldError,
  toast,
} from "@heroui/react";
import { Link, FolderOpen, Thunderbolt, ArrowRight } from "@gravity-ui/icons";
import { submitJobseekarApplication } from "@/lib/actions/applicactions";
import { useRouter } from "next/navigation";

const ApplyJob = ({ applicant, jobinfo }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    resumeLink: "",
    portfolioLink: "",
    additionalNotes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      jobId: jobinfo?._id,
      jobTitle: jobinfo?.title,
      companyName: jobinfo?.company,
      applicantEmail: applicant?.email,
      applicantName: applicant?.name,
      applicantId: applicant?.id,
      ...formData,
    };

    console.log("Application Submitted:", submissionData);
    const res = await submitJobseekarApplication(submissionData);

    if (res.acknowledged) {
      toast.success("Application Submitted Successfully");
    }
    handleReset();
    router.refresh();
  };

  const handleReset = () => {
    setFormData({
      resumeLink: "",
      portfolioLink: "",
      additionalNotes: "",
    });
  };

  return (
    <div className="max-w-2xl  mx-auto p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
      {/* Header section showing context from props */}
      <div className="mb-6">
        <p className="text-lg dark:text-zinc-50 text-zinc-900 capitalize font-semibold">
          Application Form
        </p>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Apply for {jobinfo?.title || "Position"}
        </h1>
        {applicant?.name && (
          <p className="text-sm text-zinc-500 mt-1">
            Applying as:{" "}
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              {applicant.name}
            </span>
          </p>
        )}
      </div>

      <Form onSubmit={handleSubmit} onReset={handleReset} className="space-y-6">
        {/* Resume Link Field - Required */}
        <TextField className="flex flex-col gap-1.5 w-full">
          <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
            <Link className="w-4 h-4 text-zinc-400" />
            Resume Link <span className="text-red-500">*</span>
          </Label>
          <Input
            type="url"
            name="resumeLink"
            value={formData.resumeLink}
            onChange={handleChange}
            placeholder="https://example.com/my-resume.pdf"
            required
            className="w-full px-3 py-2 bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
          />
          <Description className="text-xs text-zinc-400">
            Provide a publicly accessible URL to your resume (e.g., Google
            Drive, Dropbox).
          </Description>
          <FieldError className="text-xs text-red-500" />
        </TextField>

        {/* Portfolio Link Field - Optional */}
        <TextField className="flex flex-col gap-1.5 w-full">
          <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-zinc-400" />
            Portfolio Link{" "}
            <span className="text-xs text-zinc-400 font-normal">
              (Optional)
            </span>
          </Label>
          <Input
            type="url"
            name="portfolioLink"
            value={formData.portfolioLink}
            onChange={handleChange}
            placeholder="https://myportfolio.com"
            className="w-full px-3 py-2 bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
          />
          <Description className="text-xs text-zinc-400">
            Link to your personal website, GitHub, or design portfolio.
          </Description>
          <FieldError className="text-xs text-red-500" />
        </TextField>

        {/* Additional Notes Field - Optional Textarea */}
        <TextField className="flex flex-col gap-1.5 w-full">
          <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
            <Thunderbolt className="w-4 h-4 text-zinc-400" />
            Additional Information{" "}
            <span className="text-xs text-zinc-400 font-normal">
              (Optional)
            </span>
          </Label>
          <TextArea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            placeholder="Anything else you would like to tell us..."
            rows={4}
            className="w-full px-3 py-2 bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 min-h-25"
          />
          <Description className="text-xs text-zinc-400">
            Add a brief note or cover message for the hiring manager.
          </Description>
          <FieldError className="text-xs text-red-500" />
        </TextField>

        {/* Action Footer Aligned Bottom Right */}
        <div className="flex justify-end items-center gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <Button
            type="reset"
            className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg transition-colors"
          >
            Reset
          </Button>

          <Button
            type="submit"
            variant="primary"
            className="p-4 text-sm font-medium text-white bg-linear-to-r from-purple-600 to-purple-800  rounded-lg transition-all shadow-sm"
          >
            Submit Application
            <ArrowRight />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ApplyJob;
