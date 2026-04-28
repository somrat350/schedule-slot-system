export const generateTimeSlots = () => {
  const slots = [];
  const start = 8 * 60; // 8:00 AM
  const end = 22 * 60; // 10:00 PM
  const interval = 15; // 15 minutes

  const format = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const AmPm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${m.toString().padStart(2, "0")} ${AmPm}`;
  };

  for (let t = start; t < end; t += interval) {
    const from = format(t);
    const to = format(t + interval);
    slots.push(`${from} - ${to}`);
  }

  return slots;
};

export const convertToISO = (dateStr, timeStr) => {
  // dateStr = "2026-04-29"
  // timeStr = "9:15 AM"

  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":");

  // 12h → 24h convert
  if (modifier === "PM" && hours !== "12") {
    hours = String(Number(hours) + 12);
  }
  if (modifier === "AM" && hours === "12") {
    hours = "00";
  }

  return `${dateStr}T${hours.padStart(2, "0")}:${minutes}`;
};
