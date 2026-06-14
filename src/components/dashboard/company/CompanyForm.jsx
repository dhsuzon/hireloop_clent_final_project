"use client";

import React from "react";
import {
  Form,
  Input,
  Button,
  Select,
  TextArea,
  Label,
  ListBox,
} from "@heroui/react";
import { ArrowUpFromLine, Globe, MapPin, ChevronDown } from "@gravity-ui/icons";
import Image from "next/image";

const FormField = ({ label, children }) => (
  <div className="space-y-3">
    <Label className="text-white/90 text-sm" aria-label="FormInput">
      {label}
    </Label>
    {children}
  </div>
);

const inputStyles = "bg-[#2A2A2A] border-white/30 rounded-sm w-full";

const employeeOptions = [
  { id: "1-10", label: "1-10 employees" },
  { id: "11-50", label: "11-50 employees" },
  { id: "51-200", label: "51-200 employees" },
  { id: "201+", label: "201+ employees" },
];

const industryOptions = [
  { id: "Technology", label: "Technology" },
  { id: "Design", label: "Design & Creative" },
  { id: "Marketing", label: "Marketing" },
  { id: "Finance", label: "Finance" },
];

const CompanyForm = ({
  company,
  setIsEditing,
  submitting,
  uploading,
  logoUrl,
  handleLogoUpload,
  handleSubmit,
  submitError,
}) => {
  return (
    <div className="max-w-2xl mx-auto bg-[#111111] border border-white/10 rounded-3xl p-8 text-white">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Register New Company</h2>
        <p className="text-sm text-gray-400 mt-1">
          Enter your business details to start hiring on HireLoop.
        </p>
      </div>

      <Form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <FormField label="Company Name">
              <Input
                name="name"
                defaultValue={company?.name}
                placeholder="e.g. Acme Corp"
                variant="bordered"
                required
                className={inputStyles}
              />
            </FormField>

            <FormField label="Website URL">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10">
                  <Globe className="w-4 h-4" />
                </div>
                <Input
                  name="website"
                  type="url"
                  defaultValue={company?.website}
                  placeholder="www.company.com"
                  variant="bordered"
                  className={`${inputStyles} pl-10`}
                />
              </div>
            </FormField>

            <FormField label="Employee Count Range">
              <Select
                name="employeeCount"
                aria-label="Employee Count Range"
                defaultSelectedKeys={[company?.employeeCount || "1-10"]}
                variant="bordered"
              >
                <Select.Trigger className={inputStyles}>
                  <Select.Value placeholder="Select an item" />
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {employeeOptions.map((opt) => (
                      <ListBox.Item
                        key={opt.id}
                        id={opt.id}
                        textValue={opt.label}
                      >
                        {opt.label}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </FormField>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <FormField label="Industry / Category">
              <Select
                name="industry"
                aria-label="Industry / Category"
                defaultSelectedKeys={[company?.industry || "Technology"]}
                variant="bordered"
              >
                <Select.Trigger className={inputStyles}>
                  <Select.Value placeholder="Select an item" />
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {industryOptions.map((opt) => (
                      <ListBox.Item
                        key={opt.id}
                        id={opt.id}
                        textValue={opt.label}
                      >
                        {opt.label}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </FormField>

            <FormField label="Location">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10">
                  <MapPin className="w-4 h-4" />
                </div>
                <Input
                  name="location"
                  defaultValue={company?.location}
                  placeholder="City, Country"
                  variant="bordered"
                  className={`${inputStyles} pl-10`}
                />
              </div>
            </FormField>

            <FormField label="Company Logo">
              <label className="flex items-center gap-4 border border-dashed border-white/20 rounded-2xl p-4 cursor-pointer hover:border-white/40 transition-colors bg-[#2A2A2A]">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
                <div className="w-10 h-10 bg-white/10 rounded-sm flex items-center justify-center">
                  <ArrowUpFromLine className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm">
                    {uploading
                      ? "Uploading..."
                      : logoUrl
                        ? "Change Logo"
                        : "Upload image"}
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                </div>
                {logoUrl && (
                  <Image
                    src={logoUrl}
                    alt="logo"
                    width={48}
                    height={48}
                    className="rounded-sm ml-auto"
                    loading="eager"
                  />
                )}
              </label>
            </FormField>
          </div>
        </div>

        <FormField label="Brief Description">
          <TextArea
            name="description"
            defaultValue={company?.description}
            placeholder="Tell us about your company's mission and culture..."
            rows={5}
            variant="bordered"
            className={inputStyles}
          />
        </FormField>

        {submitError && <p className="text-red-400 text-sm">{submitError}</p>}

        <div className="flex justify-end gap-4 pt-6">
          <Button
            type="button"
            variant="light"
            onPress={() => setIsEditing(false)}
            className="rounded-sm bg-transparent border border-gray-400"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={submitting}
            className="bg-white text-black font-semibold px-8 py-3 rounded-sm"
          >
            Register Company
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CompanyForm;
