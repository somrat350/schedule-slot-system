"use client";

import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import DemoLogin from "./DemoLogin";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res?.ok) {
        toast.error("Invalid credentials!");
        return;
      }

      const session = await getSession();
      const role = session?.user?.role;

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
    } finally {
      setPassword(null);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center p-5">
      <div className="bg-base-300 w-full max-w-md p-10 rounded-2xl">
        <h2 className="text-center text-3xl font-bold">Login your account</h2>
        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-6">
          <div className="relative">
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="bg-base-100 rounded-xl py-4 pl-4 pr-12 w-full"
            />
          </div>
          <div className="relative">
            <input
              required
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-base-100 rounded-xl py-4 pl-4 pr-12 w-full"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-10 right-4 top-1/2 -translate-y-1/2 text-lg font-medium p-1 cursor-pointer"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </span>
          </div>
          <button
            disabled={loading}
            className={`bg-secondary text-white p-4 text-xl font-medium rounded-xl w-full cursor-pointer flex items-center justify-center gap-2 hover:bg-secondary/70 transition ${
              loading && "opacity-70 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="divider">OR</div>
        <DemoLogin />
      </div>
    </div>
  );
};

export default Login;
