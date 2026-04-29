"use client";

import CreateSlot from "@/components/CreateSlot";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import SlotsTable from "@/components/SlotsTable";
import { getSlots } from "@/utils/getSlots";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function TeacherPage() {
  const { data: session, status } = useSession();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const result = await getSlots();
      setSlots(result.data);
      setLoading(false);
    }
    if (!session?.user) return;
    fetchData();
  }, [session]);

  if (status === "loading") return;
  if (!session?.user || session?.user.role !== "teacher") {
    toast.error("Unauthorized access!");
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <div className="px-4">
        <h1 className="text-3xl font-bold mt-4 mb-2">All Slots</h1>

        <div className="flex items-center justify-between">
          <p>Total Slots: {loading ? <LoadingSpinner /> : slots?.length}</p>
          <CreateSlot setSlots={setSlots} />
        </div>

        <div className="overflow-x-auto mt-6 border border-secondary/80">
          <SlotsTable slots={slots} loading={loading} />
        </div>
      </div>
    </>
  );
}
