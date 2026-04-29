"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const BookNow = ({ slot, setSlots }) => {
  const [loading, setLoading] = useState(false);
  const handleBook = async () => {
    if (slot.status !== "available") return;
    setLoading(true);
    const res = await fetch("/api/booking", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ slotId: slot._id }),
    });
    const { success, message, data } = await res.json();
    setLoading(false);
    if (!success) {
      toast.error(message);
      return;
    }
    toast.success(message);
    setSlots((prev) => prev.filter((s) => s._id !== data._id));
  };
  return (
    <button
      onClick={handleBook}
      disabled={slot.status !== "available"}
      className="btn btn-sm btn-secondary btn-wide"
    >
      {loading ? (
        <span className="loading loading-spinner loading-md text-white"></span>
      ) : (
        "Book Now"
      )}
    </button>
  );
};

export default BookNow;
