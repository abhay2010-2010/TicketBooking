import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import BookingPage from "./components/User/BookingPage";
import MyBookings from "./components/User/MyBookings";
import UserLayout from "./components/User/UserLayout";
import Setting from "./components/Admin/Setting";
import Booking from "./components/Admin/Booking";
import Dashboard from "./components/Admin/Dashboard";
import AdminLayout from "./components/Admin/AdminLayout";
import Navbar from "./components/User/Navbar";


function App() {
  return (
    <AuthProvider>
      <div className="app">
        <main className="main-content">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="setting" element={<Setting />} />
              <Route path="booking" element={<Booking />} />
            </Route>
            {/* User routes */}
            <Route path="/user" element={<UserLayout />}>
            {/* <Navbar/> */}
              <Route path="booking" element={<BookingPage />} />
              <Route path="my-bookings" element={<MyBookings />} />
            </Route>
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
