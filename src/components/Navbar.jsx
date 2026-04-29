"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();
  if (status === "loading") return;
  return (
    <div className="bg-base-200 shadow-md p-4 flex items-center justify-between sticky top-0 z-10">
      <h1 className="text-xl font-bold text-secondary">Scheduling System</h1>

      <div className="flex items-center gap-4">
        {session.user.role === "student" && (
          <>
            <Link href={"/student"} className="hover:text-secondary">
              Slots
            </Link>
            <Link href={"/student/myBookings"} className="hover:text-secondary">
              My Bookings
            </Link>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        {session?.user && (
          <>
            <span className="font-medium">Hi, {session.user.name}</span>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="btn btn-secondary btn-sm"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
