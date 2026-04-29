import Navbar from "@/components/Navbar";
import { authOptions } from "@/lib/authOptions";
import { bookingCollection } from "@/lib/mongodb";
import { formatDate, formatTime } from "@/utils/formatTimes";
import { getServerSession } from "next-auth";

const getBookings = async () => {
  const session = await getServerSession(authOptions);
  const result = await bookingCollection
    .find({
      userId: session.user.id,
    })
    .toArray();
  const modified = result?.map((r) => {
    return { ...r, _id: r._id.toString(), slotId: r.slotId.toString() };
  });
  return modified;
};

const MyBookings = async () => {
  const myBooking = await getBookings();
  return (
    <>
      <Navbar />
      <div className="px-4">
        <h1 className="text-3xl font-bold mt-4 mb-2">My Booked Slots</h1>
        <p>Total Bookings: {myBooking?.length}</p>

        <div className="overflow-x-auto mt-6 border border-secondary/80">
          <table className="table">
            {/* head */}
            <thead className="bg-secondary/80 text-white">
              <tr>
                <th>SL.</th>
                <th>Date</th>
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>
            {myBooking?.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={4} className="text-center">
                    No any booked available!
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {myBooking?.map((booking, i) => (
                  <tr key={booking._id}>
                    <th>{i + 1}</th>
                    <td>{formatDate(booking.startTime)}</td>
                    <td>{formatTime(booking.startTime)}</td>
                    <td>{formatTime(booking.endTime)}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default MyBookings;
