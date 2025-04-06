import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
// import "./navbar.css"

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (user?.role === "admin") return <Outlet />;
  if (!user) return <Outlet />;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold text-blue-600">Train Booking</div>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
          </button>
        </div>

        <div className={`md:flex gap-6 items-center ${menuOpen ? "block mt-4" : "hidden"} md:mt-0`}>
          <Link
            to="/user/booking"
            className={`text-gray-700 hover:text-blue-600 font-medium ${
              location.pathname === "/user/booking" ? "text-blue-600" : ""
            }`}
          >
            <i className="fas fa-ticket-alt mr-1"></i> Book Seats
          </Link>

          <Link
            to="/user/my-bookings"
            className={`text-gray-700 hover:text-blue-600 font-medium ${
              location.pathname === "/user/my-bookings" ? "text-blue-600" : ""
            }`}
          >
            <i className="fas fa-list mr-1"></i> My Bookings
          </Link>

          <span className="hidden md:inline-block text-gray-500 mx-2">|</span>

          <span className="text-gray-600 hidden md:inline">Hi, {user?.name}</span>

          <button
            onClick={handleLogout}
            className="ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
          >
            <i className="fas fa-sign-out-alt mr-1"></i> Logout
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <main className="p-4">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-60 bg-gray-300 rounded w-full"></div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default Navbar;
