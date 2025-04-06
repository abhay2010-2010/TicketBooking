import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import BookingCard from "./BookingCard";
import { getBookings, cancelBooking } from "../../utils/api";
import "./MyBookings.css"; // Make sure to create this CSS file
const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await getBookings();

      // Simulate a slight delay to show the skeleton loading
      setTimeout(() => {
        setBookings(response.data.data);
        setLoading(false);
      }, 800);
    } catch (error) {
      toast.error("Failed to load bookings. Please try again later.");
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      setCancelling(bookingId);
      await cancelBooking(bookingId);
      toast.success("Booking cancelled successfully");
      // Refresh bookings list
      fetchBookings();
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to cancel booking");
    } finally {
      setCancelling(null);
    }
  };

  return (
    <div className="my-bookings">
      {loading ? (
        <>
          <div className="my-bookings skeleton my-bookings-skeleton-title"></div>
          <div className="my-bookings-cards-grid">
            {[1, 2, 3].map((item) => (
              <div
                className="my-bookings skeleton my-bookings-skeleton-card"
                key={item}
              ></div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 className="my-bookings-title">My Bookings</h1>

          {bookings.length === 0 ? (
            <div className="my-bookings-no-bookings">
              <p>You don't have any bookings yet.</p>
            </div>
          ) : (
            <div className="my-bookings-cards-grid">
              {bookings.map((booking) => (
                <BookingCard
                  key={booking._id}
                  booking={booking}
                  onCancel={() => handleCancelBooking(booking._id)}
                  isCancelling={cancelling === booking._id}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyBookings;
