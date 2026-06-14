"use client";

import React, { useState } from "react";
import NoCompanyResgisted from "@/components/dashboard/company/NoCompanyResgisted";
import CompanyForm from "@/components/dashboard/company/CompanyForm";
import CompanyDetails from "@/components/dashboard/company/CompanyDetails";
import { getCompaines } from "@/lib/actions/companies";
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
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY; // আপনার আসল এপিআই কি এখানে বসাবেন
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
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const payload = {
      ...data,
      logo: logoUrl,
      status: company?.status || "pending",
      recruiterId: recruiter.id,
    };
    console.log(payload);
    const payloadInfo = await getCompaines(payload);

    if (payloadInfo.acknowledged) {
      toast.success("Company registered successfully");
    } else {
      toast.error("Failed to register company");
    }

    try {
      if (onSave) await onSave(payload);
      setCompany(payload);
      setIsEditing(false); // সাবমিট শেষে এডিটিং মোড অফ হবে
    } catch (err) {
      setSubmitError("Failed to save");
    } finally {
      setSubmitting(false);
    }
  };

  // ১. কোনো কোম্পানি রেজিস্টার্ড নেই এবং এডিট মোডও অফ
  if (!company._id && !isEditing) {
    return <NoCompanyResgisted onResgisted={() => setIsEditing(true)} />;
  }

  // ২. কোম্পানি ডাটা আছে কিন্তু এডিট মোড অফ (সাবমিট হওয়ার পর এটি স্ক্রিনে দেখাবে)
  if (company && !isEditing) {
    return (
      <CompanyDetails company={company} onEdit={() => setIsEditing(true)} />
    );
  }

  // ৩. এডিট মোড অন থাকলে (isEditing === true) ফর্মটি দেখাবে
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
