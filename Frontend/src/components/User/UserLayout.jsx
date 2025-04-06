import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./UserLayout.css"; // Import your CSS file for styling

const UserLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Don't show user layout for admin users
  if (user?.role === "admin") {
    return <Outlet />;
  }

  // If not authenticated, still render the content but no sidebar
  if (!user) {
    return <Outlet />;
  }

  return (
    <div className="user-layout">
      {/* Mobile Toggle Button */}
      <button
        className="toggle-sidebar"
        onClick={toggleSidebar}
        style={{ display: window.innerWidth <= 768 ? "flex" : "none" }}
      >
        <i className={`fas ${sidebarOpen ? "fa-times" : "fa-bars"}`}></i>
      </button>

      {/* Sidebar */}
      <div className={`user-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="user-header">
          {loading ? (
            <div className="skeleton skeleton-header"></div>
          ) : (
            <h2>User Dashboard</h2>
          )}
        </div>

        <nav className="user-nav">
          {loading ? (
            // Skeleton loading for nav items
            <>
              <div className="skeleton skeleton-nav-item"></div>
              <div className="skeleton skeleton-nav-item"></div>
              <div className="skeleton skeleton-nav-item"></div>
            </>
          ) : (
            <>
              <Link
                to="/user/booking"
                className={`nav-item ${
                  location.pathname === "/user/booking" ? "active" : ""
                }`}
              >
                <i className="fas fa-ticket-alt"></i> Book Seats
              </Link>
              <Link
                to="/user/my-bookings"
                className={`nav-item ${
                  location.pathname === "/user/my-bookings" ? "active" : ""
                }`}
              >
                <i className="fas fa-list"></i> My Bookings
              </Link>
            </>
          )}
        </nav>

        <div className="user-info">
          {loading ? (
            <div className="skeleton skeleton-user-info"></div>
          ) : (
            <div className="user-name">Welcome, {user?.name}</div>
          )}
        </div>

        <div className="user-footer">
          {loading ? (
            <div className="skeleton skeleton-logout"></div>
          ) : (
            <button onClick={handleLogout} className="logout-btn">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="user-content">
      {loading ? (
          <>
            <div className="skeleton skeleton-content"></div>
            <div className="skeleton skeleton-content" style={{ height: '300px' }}></div>
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default UserLayout;