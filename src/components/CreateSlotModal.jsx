"use client";

import { useState } from "react";

const CreateSlotModal = ({ open, setOpen }) => {
  const [time, setTime] = useState("");

  const createSlot = async () => {
    const res = await fetch("http://localhost:3000/api/slots", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ startTime: time }),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    // await getSlots();
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-base-300 p-6 rounded-xl">
        <h2 className="text-xl mb-4">Create Slot</h2>

        <input
          type="datetime-local"
          className="border p-2"
          onChange={(e) => setTime(e.target.value)}
        />

        <div className="mt-4 flex gap-2">
          <button
            onClick={createSlot}
            className="bg-black text-white px-4 py-2"
          >
            Create
          </button>
          <button onClick={() => setOpen(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateSlotModal;
