import Login from "@/components/Login";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session?.user.role === "student") {
    redirect("/student");
  }
  if (session?.user.role === "teacher") {
    redirect("teacher");
  }
  return <Login />;
}
