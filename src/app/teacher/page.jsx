"use client";

import CreateSlot from "@/components/CreateSlot";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getSlots } from "@/utils/getSlots";
import { useEffect, useState } from "react";

export default function TeacherPage() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const result = await getSlots();
      setSlots(result.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="px-4">
      <h1 className="text-3xl font-bold mt-4 mb-2">Teacher Dashboard</h1>

      <div className="flex items-center justify-between">
        <p>Total Slots: {loading ? <LoadingSpinner /> : slots?.length}</p>
        <CreateSlot setSlots={setSlots} />
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
          {loading ? (
            <tbody>
              <tr>
                <th className="skeleton"></th>
                <td className="skeleton"></td>
                <td className="skeleton"></td>
                <td className="skeleton"></td>
                <td className="skeleton"></td>
              </tr>
            </tbody>
          ) : slots.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={5} className="text-center">
                  No any slot created!
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {slots?.map((slot, i) => (
                <tr key={slot._id}>
                  <th>{i + 1}</th>
                  <td>{formatDate(slot.startTime)}</td>
                  <td>{formatTime(slot.startTime)}</td>
                  <td>{formatTime(slot.endTime)}</td>
                  <td className="capitalize">{slot.status}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
