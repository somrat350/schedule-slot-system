const { authOptions } = require("@/lib/authOptions");
const { getServerSession } = require("next-auth");

const isAuthenticated = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized access!");
  }
  return session;
};

export default isAuthenticated;
