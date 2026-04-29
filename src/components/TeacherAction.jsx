"use client";

import { SquarePen, Trash } from "lucide-react";

const TeacherAction = ({ slot }) => {
  return (
    <div className="flex gap-2">
      <button className="btn btn-sm btn-square btn-info">
        <SquarePen size={20} />
      </button>
      <button className="btn btn-sm btn-square btn-warning">
        <Trash size={20} />
      </button>
    </div>
  );
};

export default TeacherAction;
