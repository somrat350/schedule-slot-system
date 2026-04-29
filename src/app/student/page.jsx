"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import SlotsTable from "@/components/SlotsTable";
import { getSlots } from "@/utils/getSlots";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const StudentPage = () => {
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const [slots, setSlots] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await getSlots("available");
      setSlots(result.data);
      setLoading(false);
    }
    if (!session?.user) return;
    fetchData();
  }, [session]);
  if (status === "loading") return;
  if (!session?.user || session?.user.role !== "student") {
    toast.error("Unauthorized access!");
    redirect("/");
  }
  return (
    <div>
      <Navbar />

      <div className="px-4">
        <h1 className="text-3xl font-bold mt-4 mb-2">Student Dashboard</h1>

        <div className="flex items-center justify-between">
          <p>Total Slots: {loading ? <LoadingSpinner /> : slots?.length}</p>
        </div>

        <div className="overflow-x-auto mt-6 border border-secondary/80">
          <SlotsTable slots={slots} setSlots={setSlots} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
