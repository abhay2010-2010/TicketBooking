import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SeatGrid from "./SeatGrid";
import { getSeats, bookSeats } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import "./BookingPage.css";

const BookingPage = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const navigate = useNavigate();
  const maxSeats = 7;

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    setLoading(true);
    try {
      const response = await getSeats();
      setTimeout(() => {
        setSeats(response.data.data);
        setLoading(false);
      }, 800);
    } catch (error) {
      toast.error("Failed to load seats. Please try again later.");
      setLoading(false);
    }
  };

  const handleBookSeats = (e) => {
    e.preventDefault();
    submitBooking(numberOfSeats);
  };

  const submitBooking = async (seats) => {
    setBookingLoading(true);
    try {
      await bookSeats(seats);
      toast.success(`Successfully booked ${seats} seats!`);
      navigate("/user/my-bookings");
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          "Failed to book seats. Please try again."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  // Helper function to render skeleton
  const renderSkeleton = () => (
    <div className="booking-page-loading">
      <div className="booking-page-skeleton booking-page-skeleton-title"></div>
      <div className="booking-page-container">
        <div
          className="booking-page-skeleton booking-page-skeleton-sidebar"
          style={{ height: "200px" }}
        ></div>
        <div
          className="booking-page-skeleton booking-page-skeleton-main"
          style={{ height: "500px" }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="booking-page">
      {loading ? (
        renderSkeleton()
      ) : (
        <div className="booking-page-content">
          <h1 className="booking-page-title">Book Train Seats</h1>

          {/* Book Seats Section - Now at the top */}
          <div className="booking-page-card">
            <h3 className="booking-page-section-title">Book Seats</h3>
            {bookingLoading ? (
              <div className="booking-form-loading">
                <div className="booking-form-skeleton"></div>
                <div
                  className="booking-form-skeleton"
                  style={{ width: "60%" }}
                ></div>
              </div>
            ) : (
              <div className="booking-form">
                <form
                  onSubmit={handleBookSeats}
                  className="booking-form-container"
                >
                  <div className="booking-form-group">
                    <label
                      htmlFor="numberOfSeats"
                      className="booking-form-label"
                    >
                      Number of Seats:
                    </label>
                    <input
                      type="number"
                      id="numberOfSeats"
                      min="1"
                      max={maxSeats}
                      value={numberOfSeats}
                      onChange={(e) => setNumberOfSeats(Number(e.target.value))}
                      className="booking-form-control"
                    />
                    {/* <span className="booking-form-hint">
                      Max: {maxSeats} seats per booking
                    </span> */}
                  </div>

                  <button
                    type="submit"
                    className="booking-form-button"
                    disabled={bookingLoading}
                  >
                    {bookingLoading ? "Processing..." : "Book Seats"}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Seat Availability Section - Now below book seats */}
          <div className="train-car">
            <SeatGrid
              seats={seats}
              onSeatSelect={setSelectedSeats}
              selectedSeats={selectedSeats}
              maxSeats={maxSeats}
            />
          </div>

          {bookingLoading && (
            <div className="booking-page-overlay">
              <div className="booking-page-spinner"></div>
              <p>Processing your booking...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingPage;
