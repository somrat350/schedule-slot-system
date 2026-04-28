"use client";

import { formatDate, formatTime } from "@/utils/formatTimes";
import { SquarePen, Trash } from "lucide-react";
import { useSession } from "next-auth/react";

const SlotsTable = ({ slots, loading }) => {
  const { data: session, status } = useSession();
  if (status === "loading") return;
  return (
    <table className="table">
      {/* head */}
      <thead className="bg-secondary/80 text-white">
        <tr>
          <th>SL.</th>
          <th>Date</th>
          <th>Start</th>
          <th>End</th>
          <th>Status</th>
          <th>Action</th>
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
            <td className="skeleton"></td>
          </tr>
        </tbody>
      ) : slots.length === 0 ? (
        <tbody>
          <tr>
            <td colSpan={6} className="text-center">
              No any slot available!
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
              <td>
                {session?.user.role === "student" ? (
                  <button className="btn btn-sm btn-secondary btn-wide">
                    Book Now
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button className="btn btn-sm btn-square btn-info">
                      <SquarePen size={20} />
                    </button>
                    <button className="btn btn-sm btn-square btn-warning">
                      <Trash size={20} />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default SlotsTable;
