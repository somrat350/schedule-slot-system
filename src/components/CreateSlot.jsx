"use client";

import { useState } from "react";
import CreateSlotModal from "./CreateSlotModal";

const CreateSlot = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)} className="btn btn-secondary">
        Create Slot
      </button>
      <CreateSlotModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default CreateSlot;
