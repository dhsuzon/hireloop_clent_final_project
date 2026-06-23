"use client";

import React, { useState } from "react";
import NoCompanyResgisted from "@/components/dashboard/company/NoCompanyResgisted";
import CompanyForm from "@/components/dashboard/company/CompanyForm";
import CompanyDetails from "@/components/dashboard/company/CompanyDetails";
import { createCompaines } from "@/lib/actions/companies";
import { toast } from "@heroui/react";

const CompanyProfile = ({ recruiterCompany, onSave, recruiter }) => {
  const [company, setCompany] = useState(recruiterCompany);
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [logoUrl, setLogoUrl] = useState(company?.logo || "");
  const [submitError, setSubmitError] = useState("");

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) setLogoUrl(data.data.url);
      else setSubmitError("Failed to upload logo");
    } catch (err) {
      setSubmitError("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);

      const payload = {
        _id: company?._id, // Ensure ID is passed to backend for update logic
        ...data,
        logo: logoUrl,
        status: company?.status || "pending",
        recruiterId: recruiter.id,
      };

      const result = await createCompaines(payload);

      if (result?.acknowledged) {
        toast.success("Company saved successfully");

        const updatedCompany = {
          ...payload,
          _id: company?._id || result.insertedId,
        };

        setCompany(updatedCompany);
        setIsEditing(false);

        if (onSave) await onSave(updatedCompany);
      } else {
        throw new Error("Database operation failed");
      }
    } catch (err) {
      setSubmitError("Failed to save company details");
      toast.error("Failed to register company");
    } finally {
      setSubmitting(false);
    }
  };

  if (!company?._id && !isEditing) {
    return <NoCompanyResgisted onResgisted={() => setIsEditing(true)} />;
  }

  if (company?._id && !isEditing) {
    return (
      <CompanyDetails company={company} onEdit={() => setIsEditing(true)} />
    );
  }

  return (
    <CompanyForm
      company={company}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      submitting={submitting}
      uploading={uploading}
      logoUrl={logoUrl}
      handleLogoUpload={handleLogoUpload}
      handleSubmit={handleSubmit}
      submitError={submitError}
    />
  );
};

export default CompanyProfile;
