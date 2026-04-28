"use client";

import { getSlots } from "@/utils/getSlots";
import { convertToISO, generateTimeSlots } from "@/utils/timeSlots";
import { useState } from "react";
import toast from "react-hot-toast";

const slots = generateTimeSlots();

const CreateSlotModal = ({ setSlots, open, setOpen }) => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const createSlot = async () => {
    if (!date || !time) {
      toast.error("Please select date and time!");
      return;
    }
    const startTime = convertToISO(date, time);
    const res = await fetch("/api/teacher/slots", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ startTime }),
    });

    const data = await res.json();

    if (!data.success) {
      toast.error(data.message);
      return;
    }
    toast.success(data.message);

    const result = await getSlots();
    setSlots(result.data);
    setOpen(false);
    setTime("");
    setDate("");
  };

  if (!open) return null;

  return (
    <div className="z-10 fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-base-100 p-6 rounded-xl">
        <h2 className="text-xl mb-4">Create Slot</h2>

        {/* Date Picker */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-medium">Select Date</span>
          </label>
          <input
            type="date"
            className="input w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Time Selector */}
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text font-medium">Select Time Slot</span>
          </label>
          <select
            className="select w-full"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option disabled value="">
              Choose a time slot
            </option>
            {slots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <button className="btn btn-neutral" onClick={() => setOpen(false)}>
            Cancel
          </button>
          <button onClick={createSlot} className="btn btn-secondary">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSlotModal;
