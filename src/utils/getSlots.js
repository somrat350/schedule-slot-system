export const getSlots = async (status = "all") => {
  const res = await fetch(`/api/teacher/slots?status=${status}`, {
    credentials: "include",
  });
  const result = await res.json();
  return result;
};
