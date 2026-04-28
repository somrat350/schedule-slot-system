"use client";

import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  if (status === "loading") return;
  return (
    <div className="bg-base-200 shadow-md p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-secondary">Scheduling System</h1>

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
