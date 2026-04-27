"use client";

import CreateSlot from "@/components/CreateSlot";
import { getSlots } from "@/utils/getSlots";
import { useEffect, useState } from "react";

export default function TeacherPage() {
  const [slots, setSlots] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await getSlots();
      setSlots(result.data);
    }
    fetchData();
  }, []);

  return (
    <div className="px-4">
      <h1 className="text-3xl font-bold mt-4 mb-2">Teacher Dashboard</h1>

      <div className="flex items-center justify-between">
        <p>Total Slots: {slots?.length}</p>
        <CreateSlot />
      </div>

      <div className="overflow-x-auto mt-6 border border-secondary/80">
        <table className="table">
          {/* head */}
          <thead className="bg-secondary/80 text-white">
            <tr>
              <th>SL.</th>
              <th>Date</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {slots?.map((slot, i) => (
              <tr key={slot._id}>
                <th>{i + 1}</th>
                <td>{new Date(slot.startTime).toLocaleDateString()}</td>
                <td>{new Date(slot.startTime).toLocaleTimeString()}</td>
                <td>{new Date(slot.endTime).toLocaleTimeString()}</td>
                <td>{slot.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
