import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import "./Dashboard.css"; // Import your CSS file for styling
const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalBookedSeats: 0,
    totalAvailableSeats: 0,
    recentBookings: [],
  });
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/stats`,
        config
      );

      if (response.data.success) {
        // Simulate a slight delay to show the skeleton loading
        setTimeout(() => {
          setStats(response.data.data);
          setLoading(false);
        }, 800);
      } else {
        console.error("Failed to fetch stats:", response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      setCancelling(bookingId);
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/bookings/${bookingId}`,
        config
      );

      alert("Booking canceled successfully!");
      fetchStats(); // Refresh data after cancellation
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Failed to cancel booking.");
    } finally {
      setCancelling(null);
    }
  };

  // Function to format booking IDs for better display
  const formatBookingId = (id) => {
    if (id && id.length > 8) {
      return `#${id.substring(0, 8)}...`;
    }
    return id;
  };

  return (
    <>
      <div className="admin-dashboard">
        {loading ? (
          <>
            <div className="skeleton skeleton-title"></div>

            <div className="stats-grid">
              {[1, 2, 3, 4].map((item) => (
                <div className="skeleton skeleton-card" key={item}></div>
              ))}
            </div>

            <div className="skeleton skeleton-heading"></div>
            <div className="skeleton skeleton-table"></div>
          </>
        ) : (
          <>
            <h1 className="dashboard-title">Admin Dashboard</h1>

            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Users</h3>
                <p className="stat-value">{stats.totalUsers}</p>
              </div>
              <div className="stat-card">
                <h3>Total Bookings</h3>
                <p className="stat-value">{stats.totalBookings}</p>
              </div>
              <div className="stat-card">
                <h3>Total Booked Seats</h3>
                <p className="stat-value">{stats.totalBookedSeats}</p>
              </div>
              <div className="stat-card">
                <h3>Total Available Seats</h3>
                <p className="stat-value">{stats.totalAvailableSeats}</p>
              </div>
            </div>

            {/* Recent Bookings Section */}
            <h2 className="section-title">Recent Bookings</h2>
            {stats.recentBookings.length > 0 ? (
              <table className="recent-bookings-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Seat Numbers</th>
                    <th>Total Seats</th>
                    <th>Booking Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentBookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{formatBookingId(booking._id)}</td>
                      <td>{booking.user.name}</td>
                      <td>{booking.user.email}</td>
                      <td>{booking.seatNumbers.join(", ")}</td>
                      <td>{booking.totalSeats}</td>
                      <td>{new Date(booking.createdAt).toLocaleString()}</td>
                      <td>
                        <button
                          className="cancel-button"
                          onClick={() => handleCancelBooking(booking._id)}
                          disabled={cancelling === booking._id}
                        >
                          {cancelling === booking._id
                            ? "Cancelling..."
                            : "Cancel"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-bookings">No recent bookings available.</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
