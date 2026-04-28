"use client";

import { useState } from "react";
import CreateSlotModal from "./CreateSlotModal";

const CreateSlot = ({ setSlots }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)} className="btn btn-secondary">
        Create New Slot
      </button>
      <CreateSlotModal setSlots={setSlots} open={open} setOpen={setOpen} />
    </div>
  );
};

export default CreateSlot;
