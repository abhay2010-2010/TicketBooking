import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminLayout.css'; // Import your CSS file for styling
const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-layout">
        <div className="access-denied">
          {loading ? (
            <>
              <div className="skeleton" style={{ width: '200px', height: '40px', marginBottom: '1rem' }}></div>
              <div className="skeleton" style={{ width: '300px', height: '20px', marginBottom: '2rem' }}></div>
              <div className="skeleton" style={{ width: '150px', height: '40px' }}></div>
            </>
          ) : (
            <>
              <h2>Access Denied</h2>
              <p>You don't have permission to access this area. Please log in as an admin.</p>
              <Link to="/login" className="access-denied-button">Go to Login</Link>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* Mobile Toggle Button */}
      <button 
        className="toggle-sidebar" 
        onClick={toggleSidebar}
        style={{ display: window.innerWidth <= 768 ? 'flex' : 'none' }}
      >
        <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>

      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-header">
          {loading ? (
            <div className="skeleton skeleton-header"></div>
          ) : (
            <h2>Admin Panel</h2>
          )}
        </div>

        <nav className="admin-nav">
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
                to="/admin/dashboard" 
                className={`nav-item ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
              >
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </Link>
              <Link 
              to="/admin/booking"
                className={`nav-item ${location.pathname.includes('/admin/bookings') ? 'active' : ''}`}
              >
                <i className="fas fa-ticket-alt"></i> Bookings
              </Link>
              <Link 
              to="/admin/setting" 
                className={`nav-item ${location.pathname === '/admin/settings' ? 'active' : ''}`}
              >
                <i className="fas fa-cog"></i> Settings
              </Link>
            </>
          )}
        </nav>

        <div className="admin-footer">
          {loading ? (
            <div className="skeleton skeleton-logout"></div>
          ) : (
            <button onClick={handleLogout} className="logout-btn">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="admin-content">
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

export default AdminLayout;