export const getSlots = async () => {
  const res = await fetch("/api/teacher/slots", {
    credentials: "include",
  });
  const result = await res.json();
  return result;
};
