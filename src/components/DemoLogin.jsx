"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const DemoLogin = () => {
  const router = useRouter();
  const [tLoading, setTLoading] = useState(false);
  const [sLoading, setSLoading] = useState(false);
  const teacher = {
    email: "teacher@test.com",
    password: "teacher123",
    role: "teacher",
  };
  const student = {
    email: "student@test.com",
    password: "student123",
    role: "student",
  };

  const demoLogin = async ({ email, password, role }) => {
    try {
      if (role === "teacher") {
        setTLoading(true);
      } else {
        setSLoading(true);
      }
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      toast.success("Login successful.");

      if (role === "teacher") {
        router.push("/teacher");
      } else if (role === "student") {
        router.push("/student");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal server error!");
    } finally {
      if (role === "teacher") {
        setTLoading(false);
      } else {
        setSLoading(false);
      }
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => demoLogin(teacher)}
        disabled={tLoading}
        className={`bg-base-100 text-white p-4 text-lg font-medium rounded-xl w-full cursor-pointer flex items-center justify-center gap-2 hover:bg-base-200 transition ${
          tLoading && "opacity-70 cursor-not-allowed"
        }`}
      >
        {tLoading ? (
          <>
            <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
            Logging in...
          </>
        ) : (
          "Demo Teacher"
        )}
      </button>
      <button
        onClick={() => demoLogin(student)}
        disabled={sLoading}
        className={`bg-base-100 text-white p-4 text-lg font-medium rounded-xl w-full cursor-pointer flex items-center justify-center gap-2 hover:bg-base-200 transition ${
          sLoading && "opacity-70 cursor-not-allowed"
        }`}
      >
        {sLoading ? (
          <>
            <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
            Logging in...
          </>
        ) : (
          "Demo Student"
        )}
      </button>
    </div>
  );
};

export default DemoLogin;
