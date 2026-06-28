"use client";

import React, { useMemo } from "react";
import { InputGroup, TextField, Label, Select, ListBox } from "@heroui/react";
import { Magnifier, ChevronDown } from "@gravity-ui/icons";

const JobFilters = ({
  alljobs,
  search,
  setSearch,
  category,
  setCategory,
  jobType,
  setJobType,
  remoteOnly,
  setRemoteOnly,
}) => {
  const uniqueCategories = useMemo(
    () => [
      "all",
      ...Array.from(new Set(alljobs.map((j) => j.category).filter(Boolean))),
    ],
    [alljobs],
  );
  const uniqueTypes = useMemo(
    () => [
      "all",
      ...Array.from(new Set(alljobs.map((j) => j.type).filter(Boolean))),
    ],
    [alljobs],
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end mb-8 bg-[#121212] p-5 rounded-2xl border border-zinc-800/50">
      <div className="md:col-span-4">
        <TextField>
          <Label className="text-zinc-400 text-xs font-semibold mb-1.5 block">
            Search Keyword
          </Label>
          <InputGroup className="bg-zinc-900 border border-zinc-800/80 rounded-xl px-3.5 py-2 flex items-center gap-2">
            <Magnifier className="w-4 h-4 text-zinc-500" />
            <InputGroup.Input
              type="text"
              placeholder="Title, tech stacks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-white w-full text-sm focus:outline-none"
            />
          </InputGroup>
        </TextField>
      </div>

      <div className="md:col-span-3">
        <Select>
          <Label className="text-zinc-400 text-xs font-semibold mb-1.5 block">
            Job Category
          </Label>
          <Select.Trigger className="bg-zinc-900 border border-zinc-800/80 text-white rounded-xl px-3.5 py-2 flex items-center justify-between w-full text-sm">
            <Select.Value>
              {category === "all" ? "All Categories" : category}
            </Select.Value>
            <Select.Indicator>
              <ChevronDown className="w-4 h-4 text-zinc-500" />
            </Select.Indicator>
          </Select.Trigger>
          <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-xl p-1 z-50">
            <ListBox>
              {uniqueCategories.map((cat) => (
                <ListBox.Item
                  key={cat}
                  onClick={() => setCategory(cat)}
                  textValue={cat}
                  className="cursor-pointer px-3 py-2 text-zinc-300"
                >
                  {cat === "all" ? "All Categories" : cat}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      <div className="md:col-span-3">
        <Select>
          <Label className="text-zinc-400 text-xs font-semibold mb-1.5 block">
            Job Type
          </Label>
          <Select.Trigger className="bg-zinc-900 border border-zinc-800/80 text-white rounded-xl px-3.5 py-2 flex items-center justify-between w-full text-sm">
            <Select.Value>
              {jobType === "all" ? "All Types" : jobType}
            </Select.Value>
            <Select.Indicator>
              <ChevronDown className="w-4 h-4 text-zinc-500" />
            </Select.Indicator>
          </Select.Trigger>
          <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-xl p-1 z-50">
            <ListBox>
              {uniqueTypes.map((type) => (
                <ListBox.Item
                  key={type}
                  onClick={() => setJobType(type)}
                  textValue={type}
                  className="cursor-pointer px-3 py-2 text-zinc-300"
                >
                  {type === "all" ? "All Types" : type}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      <div className="md:col-span-2 flex items-center justify-end pb-1.5">
        <label className="flex items-center gap-3 cursor-pointer">
          <span className="text-zinc-400 text-xs font-semibold">
            Remote Only
          </span>
          <input
            type="checkbox"
            checked={remoteOnly}
            onChange={(e) => setRemoteOnly(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-10 h-6 bg-zinc-800 rounded-full peer peer-checked:bg-[#f472b6]"></div>
        </label>
      </div>
    </div>
  );
};

export default JobFilters;
