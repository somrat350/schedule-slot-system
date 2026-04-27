import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const isAuthenticated = async (req) => {
  const session = await getServerSession(authOptions, req);
  if (!session || !session.user) {
    throw new Error("Unauthorized access!");
  }
  return session;
};

export default isAuthenticated;
