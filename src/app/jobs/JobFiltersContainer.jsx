"use client";

import React, { useState, useMemo } from "react";
import { InputGroup, TextField, Label, Select, ListBox } from "@heroui/react";
import { Magnifier, ChevronDown } from "@gravity-ui/icons";
import JobCard from "@/components/dashboard/jobs/JobCard";

const JobFiltersContainer = ({ jobs = [] }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [jobType, setJobType] = useState("all");
  const [remoteOnly, setRemoteOnly] = useState(false); // State for remote filter

  // Dynamically extract distinct categories and types from backend values
  const uniqueCategories = useMemo(() => {
    const list = jobs.map((j) => j.category).filter(Boolean);
    return ["all", ...Array.from(new Set(list))];
  }, [jobs]);

  const uniqueTypes = useMemo(() => {
    const list = jobs.map((j) => j.type).filter(Boolean);
    return ["all", ...Array.from(new Set(list))];
  }, [jobs]);

  // Reactive filtering calculation
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchSearch =
        !search ||
        job.title?.toLowerCase().includes(search.toLowerCase()) ||
        job.company?.toLowerCase().includes(search.toLowerCase()) ||
        job.requirements?.toLowerCase().includes(search.toLowerCase());

      const matchCategory = category === "all" || job.category === category;
      const matchType = jobType === "all" || job.type === jobType;

      // Remote Only filter logic
      const matchRemote = !remoteOnly || job.remote === true;

      return matchSearch && matchCategory && matchType && matchRemote;
    });
  }, [search, category, jobType, remoteOnly, jobs]);

  return (
    <>
      {/* HEROUI INPUT & SELECT FILTERS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end mb-8 bg-[#121212] p-5 rounded-2xl border border-zinc-800/50">
        {/* Search Input (Takes 4 grid columns) */}
        <div className="md:col-span-4">
          <TextField>
            <Label className="text-zinc-400 text-xs font-semibold mb-1.5 block tracking-wide">
              Search Keyword
            </Label>
            <InputGroup className="bg-zinc-900 border border-zinc-800/80 focus-within:border-zinc-700 rounded-xl px-3.5 py-2 flex items-center gap-2 transition-all">
              <InputGroup.Prefix>
                <Magnifier className="w-4 h-4 text-zinc-500" />
              </InputGroup.Prefix>
              <InputGroup.Input
                type="text"
                placeholder="Title, tech stacks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-white placeholder-zinc-600 focus:outline-none w-full text-sm"
              />
            </InputGroup>
          </TextField>
        </div>

        {/* Category Selector (Takes 3 grid columns) */}
        <div className="md:col-span-3">
          <Select>
            <Label className="text-zinc-400 text-xs font-semibold mb-1.5 block tracking-wide">
              Job Category
            </Label>
            <Select.Trigger className="bg-zinc-900 border border-zinc-800/80 text-white rounded-xl px-3.5 py-2 flex items-center justify-between w-full text-sm cursor-pointer hover:bg-zinc-900 transition-colors">
              <Select.Value>
                {category === "all" ? "All Categories" : category}
              </Select.Value>
              <Select.Indicator>
                <ChevronDown className="w-4 h-4 text-zinc-500" />
              </Select.Indicator>
            </Select.Trigger>
            <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-1 mt-1 min-w-50 z-50">
              <ListBox>
                {uniqueCategories.map((cat) => (
                  <ListBox.Item
                    key={cat}
                    onClick={() => setCategory(cat)}
                    textValue={cat}
                    className="cursor-pointer px-3 py-2 hover:bg-zinc-800 rounded-lg text-sm text-zinc-300 hover:text-white transition-colors"
                  >
                    <Label className="cursor-pointer font-normal">
                      {cat === "all" ? "All Categories" : cat}
                    </Label>
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Job Type Selector (Takes 3 grid columns) */}
        <div className="md:col-span-3">
          <Select>
            <Label className="text-zinc-400 text-xs font-semibold mb-1.5 block tracking-wide">
              Job Type
            </Label>
            <Select.Trigger className="bg-zinc-900 border border-zinc-800/80 text-white rounded-xl px-3.5 py-2 flex items-center justify-between w-full text-sm cursor-pointer hover:bg-zinc-900 transition-colors">
              <Select.Value>
                {jobType === "all" ? "All Types" : jobType}
              </Select.Value>
              <Select.Indicator>
                <ChevronDown className="w-4 h-4 text-zinc-500" />
              </Select.Indicator>
            </Select.Trigger>
            <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-1 mt-1 min-w-50 z-50">
              <ListBox>
                {uniqueTypes.map((type) => (
                  <ListBox.Item
                    key={type}
                    onClick={() => setJobType(type)}
                    textValue={type}
                    className="cursor-pointer px-3 py-2 hover:bg-zinc-800 rounded-lg text-sm text-zinc-300 hover:text-white transition-colors"
                  >
                    <Label className="cursor-pointer font-normal">
                      {type === "all" ? "All Types" : type}
                    </Label>
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Premium Remote-Only Toggle Switch (Takes 2 grid columns) */}
        <div className="md:col-span-2 flex items-center justify-start md:justify-end pb-1.5">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <span className="text-zinc-400 text-xs font-semibold tracking-wide md:hidden lg:block">
              Remote Only
            </span>
            <div className="relative">
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
                className="sr-only peer"
              />
              {/* Toggle Track Wrapper */}
              <div className="w-10 h-6 bg-zinc-800 border border-zinc-700/60 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-1 after:inset-s-1 after:bg-zinc-400 peer-checked:after:bg-[#f472b6] after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-zinc-900 peer-checked:border-[#f472b6]/40"></div>
            </div>
          </label>
        </div>
      </div>

      {/* 3-COLUMN GRID DISPLAY */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job._id} jobs={job} />)
        ) : (
          <div className="col-span-full text-zinc-500 text-center py-12">
            No job postings match your current filter selection.
          </div>
        )}
      </div>
    </>
  );
};
export default JobFiltersContainer;
