"use client";

import { Pencil, TrashBin } from "@gravity-ui/icons";

const JobActions = ({jobId}) => {
    const handleEdit = (id) => {
    console.log("Edit Job ID:", id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      console.log("Delete Job ID:", id);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleEdit(jobId)}
          className="text-gray-400 hover:text-blue-400 p-1 bg-white/5 rounded-md"
          type="button"
        >
          <Pencil width={16} height={16} />
        </button>
        <button
          onClick={() => handleDelete(jobId)}
          className="text-red-500 hover:text-red-400 p-1 bg-white/5 rounded-md"
          type="button"
        >
          <TrashBin width={16} height={16} />
        </button>
      </div>
    </>
  );
}

export default JobActions