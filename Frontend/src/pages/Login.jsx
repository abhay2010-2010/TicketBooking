import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate initial page loading
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please provide email and password");
      return;
    }

    setLoading(true);

    try {
      const userData = await login(formData.email, formData.password);
      toast.success("Login successful");

      // Redirect based on user role
      if (userData && userData.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/booking");
      }
    } catch (error) {
      toast.error(error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {pageLoading ? (
          <>
            <div className="skeleton skeleton-title"></div>
            <div className="auth-form">
              <div className="form-group">
                <div
                  className="skeleton skeleton-text"
                  style={{ width: "30%" }}
                ></div>
                <div className="skeleton skeleton-input"></div>
              </div>

              <div className="form-group">
                <div
                  className="skeleton skeleton-text"
                  style={{ width: "40%" }}
                ></div>
                <div className="skeleton skeleton-input"></div>
              </div>

              <div className="skeleton skeleton-button"></div>
            </div>

            <div className="skeleton skeleton-link"></div>
          </>
        ) : (
          <>
            <h1 className="auth-title">Login</h1>
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      email: e.target.value.toLowerCase(),
                    });
                  }}
                  className="form-control"
                  placeholder="Enter your email"
                  required
                  style={{ textTransform: "lowercase" }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button type="submit" disabled={loading} className="auth-button">
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="auth-footer">
              Don't have an account?{" "}
              <Link to="/register" className="auth-link">
                Register
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
