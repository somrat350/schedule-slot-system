export const getSlots = async () => {
  const res = await fetch("http://localhost:3000/api/slots", {
    credentials: "include",
  });
  const result = await res.json();
  return result;
};
