"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import { Pencil, Globe } from "@gravity-ui/icons"; // গ্লোব আইকন ইম্পোর্ট করা হলো

const CompanyDetails = ({ company, onEdit }) => {
  if (!company) return null;

  // স্ট্যাটাস অনুযায়ী ব্যাজের কালার
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "rejected":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default: // pending
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }
  };

  // ডুপ্লিকেট "employees" টেক্সট প্রতিরোধ করার লজিক
  const renderEmployeeCount = () => {
    if (!company.employeeCount) return "N/A";
    if (company.employeeCount.toLowerCase().includes("employee")) {
      return company.employeeCount;
    }
    return `${company.employeeCount} employees`;
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#111111] border border-white/10 rounded-sm p-8 text-white space-y-6 shadow-2xl">
      {/* কার্ড হেডার */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          {company.logo && (
            <Image
              src={company.logo}
              alt="Company Logo"
              width={60}
              height={60}
              className="rounded-sm object-cover bg-white/5 p-1 border border-white/10"
            />
          )}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-2xl font-bold tracking-tight">
                {company.name}
              </h2>
              <span
                className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium border capitalize ${getStatusStyles(company.status)}`}
              >
                {company.status || "pending"}
              </span>
            </div>

            {/* গ্লোব আইকনসহ ওয়েবসাইট ইউআরএল */}
            {company.website ? (
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-blue-400 hover:underline font-medium break-all"
              >
                <Globe width={14} height={14} className="text-gray-400" />
                <span>{company.website}</span>
              </a>
            ) : (
              <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                <Globe width={14} height={14} />
                <span>No website provided</span>
              </div>
            )}
          </div>
        </div>

        {/* এডিট বাটন */}
        <Button
          onPress={onEdit}
          className="bg-transparent text-white font-semibold rounded-sm px-4 flex items-center gap-2 h-10 transition-all border border-white/10 hover:border-gray-400 active:scale-95"
        >
          <Pencil width={14} height={14} />
          <span className="text-sm">Edit Profile</span>
        </Button>
      </div>

      {/* কার্ড বডি / ৩-কলাম ইনফরমেশন গ্রিড */}
      <div className="space-y-4">
        {/* ৩টি কলামের ছোট কার্ড গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* ১. ইন্ডাস্ট্রি ক্যাটাগরি কার্ড */}
          <div className="bg-white/5 border border-white/5 rounded-sm p-4 flex flex-col justify-center space-y-1">
            <h4 className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">
              Industry Category
            </h4>
            <p className="text-sm text-gray-200 font-medium capitalize">
              {company.industry || "N/A"}
            </p>
          </div>

          {/* ২. লোকেশন কার্ড */}
          <div className="bg-white/5 border border-white/5 rounded-sm p-4 flex flex-col justify-center space-y-1">
            <h4 className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">
              Location
            </h4>
            <p className="text-sm text-gray-200 font-medium capitalize">
              {company.location || "N/A"}
            </p>
          </div>

          {/* ৩. কোম্পানি স্কেল/সাইজ কার্ড */}
          <div className="bg-white/5 border border-white/5 rounded-sm p-4 flex flex-col justify-center space-y-1">
            <h4 className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">
              Company Scale
            </h4>
            <p className="text-sm text-gray-200 font-medium">
              {renderEmployeeCount()}
            </p>
          </div>
        </div>

        {/* ৪. কোম্পানি ডেসক্রিপশন কার্ড (ফুল উইডথ) */}
        <div className="bg-white/5 border border-white/5 rounded-sm p-5 space-y-2">
          <h4 className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">
            Description
          </h4>
          <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
            {company.description || "No description provided."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
