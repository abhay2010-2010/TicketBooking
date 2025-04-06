import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import "./Home.css";
 const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate feature highlights
  useEffect(() => {
    if (!loading) {
      const interval = setInterval(() => {
        setActiveFeature((prev) => (prev + 1) % 3);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleExplore = () => {
    const featuresSection = document.querySelector(".features-section");
    featuresSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
              <path d="M17.2 20c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1M6.8 20c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1M18 10.5h3v2h-3m0-2v-6H4v14h3M22 9h-4V4H2v16h4c0 1.7 1.3 3 3 3s3-1.3 3-3h4c0 1.7 1.3 3 3 3s3-1.3 3-3h2v-5l-2-4z" />
            </svg>
          </div>
          <span>RailEase</span>
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-link active">
            Home
          </Link>
          <Link to="/routes" className="nav-link">
            Routes
          </Link>
          <Link to="/services" className="nav-link">
            Services
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </div>
        <div className="nav-auth">
          {isAuthenticated ? (
            <Link to="/dashboard" className="auth-button dashboard">
              My Trips
            </Link>
          ) : (
            <>
              <button onClick={handleLogin} className="auth-button login">
                Sign In
              </button>
              <button onClick={handleRegister} className="auth-button register">
                Join Now
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="train-animation"></div>
        </div>
        <div className="hero-content">
          {loading ? (
            <div className="hero-loading">
              <div className="loading-bar"></div>
              <div className="loading-bar"></div>
              <div className="loading-bar"></div>
            </div>
          ) : (
            <>
              <h1 className="hero-title">
                Travel <span className="accent">Smarter</span>,<br />
                Book <span className="accent">Faster</span>
              </h1>
              <p className="hero-subtitle">
                Reserve your perfect train seat with just a few clicks. Seamless
                booking, real-time availability, instant confirmation.
              </p>
              <div className="hero-actions">
                <button onClick={handleRegister} className="btn-primary">
                  Get Started
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    height="20"
                    width="20"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                <button onClick={handleExplore} className="btn-secondary">
                  Learn More
                </button>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">100+</span>
                  <span className="stat-label">Routes</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Users</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat">
                  <span className="stat-number">99%</span>
                  <span className="stat-label">Satisfaction</span>
                </div>
              </div>
            </>
          )}
        </div>
        
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <span className="section-tag">Features</span>
          <h2>Why Choose RailEase</h2>
          <p>
            We offer an unparalleled booking experience with these amazing
            features
          </p>
        </div>

        {loading ? (
          <div className="features-grid-skeleton">
            {[1, 2, 3].map((i) => (
              <div className="feature-skeleton" key={i}>
                <div className="skeleton skeleton-icon"></div>
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="features-tabs">
            <div className="tabs-navigation">
              <button
                className={`tab-button ${activeFeature === 0 ? "active" : ""}`}
                onClick={() => setActiveFeature(0)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="24"
                  width="24"
                >
                  <path d="M4 17h8v-2H4m13 3v-3h-3v3h-2v-3h-3v3H7v-3H4v3H3v4h18v-4h-1v3h-3M4 8h12v-2H4m0 7h5v-2H4m9 0v-3h-3v3h-2v-3H5v3H4v3h7v-3h2v3h7v-3h-1v-3h-3z" />
                </svg>
                Interactive Seat Map
              </button>
              <button
                className={`tab-button ${activeFeature === 1 ? "active" : ""}`}
                onClick={() => setActiveFeature(1)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="24"
                  width="24"
                >
                  <path d="M20 6h-3V4c0-1.11-.89-2-2-2H9c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2M9 4h6v2H9V4m11 15H4V8h3v2h2V8h6v2h2V8h3v11z" />
                </svg>
                Digital Tickets
              </button>
              <button
                className={`tab-button ${activeFeature === 2 ? "active" : ""}`}
                onClick={() => setActiveFeature(2)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="24"
                  width="24"
                >
                  <path d="M17.5 13.4l-.7 1.1-.7-1.1V9h1.4M18 2H6v2h12m0 13a1 1 0 011 1c0 .5-.38.9-.86.97L17.9 20H10v-3h7v.5c0-.83.67-1.5 1.5-1.5m-13 .5v3H6a2 2 0 01-2-2V6c0-1.11.89-2 2-2h1v2H6v11h9v-1.5M22 6v9c0 1.11-.89 2-2 2h-1v-2h1V6h-9v1.5H9V6h1V4h10a2 2 0 012 2m-6.9 6.4l-.7 1.1-.7-1.1V9h1.4v3.4z" />
                </svg>
                Automated Reminders
              </button>
            </div>

            <div className="tabs-content">
              <div
                className={`tab-pane ${activeFeature === 0 ? "active" : ""}`}
              >
                <div className="tab-info">
                  <h3>Interactive Seat Selection</h3>
                  <p>
                    View the entire train layout and choose your perfect seat
                    with our intuitive, visual seat map.
                  </p>
                  <ul>
                    <li>Real-time availability updates</li>
                    <li>Cabin and seat type filtering</li>
                    <li>Panoramic carriage view</li>
                    <li>Seat amenities information</li>
                  </ul>
                  <Link to="/features" className="feature-link">
                    Learn More
                  </Link>
                </div>
                <div className="tab-image seat-map-preview"></div>
              </div>

              <div
                className={`tab-pane ${activeFeature === 1 ? "active" : ""}`}
              >
                <div className="tab-info">
                  <h3>Paperless Digital Tickets</h3>
                  <p>
                    Skip the printing with our convenient mobile tickets and
                    boarding passes.
                  </p>
                  <ul>
                    <li>QR code boarding passes</li>
                    <li>Apple Wallet & Google Pay integration</li>
                    <li>Offline access to tickets</li>
                    <li>Easy ticket transfers to friends</li>
                  </ul>
                  <Link to="/features" className="feature-link">
                    Learn More
                  </Link>
                </div>
                <div className="tab-image ticket-preview"></div>
              </div>

              <div
                className={`tab-pane ${activeFeature === 2 ? "active" : ""}`}
              >
                <div className="tab-info">
                  <h3>Smart Journey Notifications</h3>
                  <p>
                    Never miss your train with timely alerts and important
                    travel updates.
                  </p>
                  <ul>
                    <li>Boarding time reminders</li>
                    <li>Platform change alerts</li>
                    <li>Delay notifications</li>
                    <li>Weather warnings</li>
                  </ul>
                  <Link to="/features" className="feature-link">
                    Learn More
                  </Link>
                </div>
                <div className="tab-image reminder-preview"></div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* How It Works Section */}
      <section className="process-section">
        <div className="section-header">
          <span className="section-tag">Process</span>
          <h2>How It Works</h2>
          <p>Book your journey in just three simple steps</p>
        </div>

        {loading ? (
          <div className="process-skeleton">
            {[1, 2, 3].map((i) => (
              <div className="process-step-skeleton" key={i}>
                <div className="skeleton skeleton-circle"></div>
                <div className="skeleton skeleton-line"></div>
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-text"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Create Your Account</h3>
                <p>
                  Sign up in seconds with your email or social media accounts
                </p>
              </div>
              <div className="step-icon account-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="32"
                  width="32"
                >
                  <path d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" />
                </svg>
              </div>
            </div>

            <div className="process-connector"></div>

            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Select Your Journey</h3>
                <p>
                  Browse routes, compare times, and choose your perfect seat
                </p>
              </div>
              <div className="step-icon select-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="32"
                  width="32"
                >
                  <path d="M18 9.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5m-7.5 3c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5M20 16v-3c-1.39 0-2.5-1.11-2.5-2.5S18.61 8 20 8V5H4v3c1.39 0 2.5 1.11 2.5 2.5S5.39 13 4 13v3h16z" />
                </svg>
              </div>
            </div>

            <div className="process-connector"></div>

            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Complete Booking</h3>
                <p>Pay securely and receive your digital ticket instantly</p>
              </div>
              <div className="step-icon payment-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="32"
                  width="32"
                >
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2m0 14H4v-6h16v6m0-10H4V6h16v2z" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-header light">
          <span className="section-tag">Testimonials</span>
          <h2>What Our Customers Say</h2>
        </div>

        {loading ? (
          <div className="testimonial-skeleton">
            {[1, 2, 3].map((i) => (
              <div className="testimonial-card-skeleton" key={i}>
                <div className="skeleton skeleton-avatar"></div>
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="testimonial-carousel">
            <div className="testimonial-card">
              <div className="testimonial-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="20"
                    width="20"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                  </svg>
                ))}
              </div>
              <p className="testimonial-text">
                "This app completely transformed my commuting experience. The
                seat selection feature is incredibly intuitive, and I love
                getting reminders before my train arrives."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">JD</div>
                <div className="author-info">
                  <h4>James Davis</h4>
                  <p>Daily Commuter</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="20"
                    width="20"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                  </svg>
                ))}
              </div>
              <p className="testimonial-text">
                "The digital tickets are a game-changer. No more printing or
                worrying about losing my tickets. Plus, the customer service is
                exceptional when you need help."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">SM</div>
                <div className="author-info">
                  <h4>Sarah Miller</h4>
                  <p>Business Traveler</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="20"
                    width="20"
                    className={star === 5 ? "half-star" : ""}
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                  </svg>
                ))}
              </div>
              <p className="testimonial-text">
                "I travel with my family often, and being able to choose seats
                together makes such a difference. The app is fast, reliable and
                has saved us so much time at the station."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">RP</div>
                <div className="author-info">
                  <h4>Robert Parker</h4>
                  <p>Family Traveler</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* App Download */}
      <section className="app-section">
        {!loading && (
          <>
            <div className="app-content">
              <div className="app-details">
                <span className="section-tag">Mobile App</span>
                <h2>Take RailEase On The Go</h2>
                <p>
                  Download our mobile app for an even better booking experience.
                  Access your tickets offline, receive real-time updates, and
                  manage your journeys with ease.
                </p>

                <div className="app-features">
                  <div className="app-feature">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="24"
                      width="24"
                    >
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2m-1 17.94c-3.93-.5-7-3.88-7-7.94s3.07-7.44 7-7.93v15.87zm2-.01V13h5.99c-.47 3.94-3.24 6.64-5.99 6.93z" />
                    </svg>
                    <span>Offline access</span>
                  </div>
                  <div className="app-feature">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="24"
                      width="24"
                    >
                      <path d="M21 11.11V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h7.11c1.26 1.24 2.99 2 4.89 2 3.87 0 7-3.13 7-7 0-1.9-.76-3.63-2-4.89M7 7h10v2H7V7m12 10c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3m-3-1h-1v2h1v-2m0-6H7v-2h9v2z" />
                    </svg>
                    <span>Express booking</span>
                  </div>
                  <div className="app-feature">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="24"
                      width="24"
                    >
                      <path d="M12 3v10l3-3h6a2 2 0 002-2V3c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14l4-4h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2h-9z" />
                    </svg>
                    <span>Live chat support</span>
                  </div>
                </div>

                <div className="app-buttons">
                  <a href="#" className="app-button">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="20"
                      width="20"
                    >
                      <path d="M3 20.5v-17A1.5 1.5 0 014.5 2h15A1.5 1.5 0 0121 3.5v17a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 20.5zM7.5 5h9a.5.5 0 110 1h-9a.5.5 0 010-1zm0 2h9a.5.5 0 110 1h-9a.5.5 0 010-1zm0 2h9a.5.5 0 110 1h-9a.5.5 0 010-1zm-1 5.75a1.75 1.75 0 113.5 0 1.75 1.75 0 01-3.5 0zm1 0c0 .414.336.75.75.75s.75-.336.75-.75-.336-.75-.75-.75-.75.336-.75.75zM9 18h6a.5.5 0 110 1H9a.5.5 0 010-1z" />
                    </svg>
                    <span>
                      <small>Download on the</small>
                      <strong>App Store</strong>
                    </span>
                  </a>
                  <a href="#" className="app-button">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="20"
                      width="20"
                    >
                      <path d="M3.609 1.814L13.792 12 3.609 22.186A2.414 2.414 0 012 20.333V3.667c0-.84.344-1.598.892-2.15.548-.551 1.307-.89 2.149-.883zm15.966 7.402l3.907 2.272c.698.405 1.097.635 1.345.934.228.273.35.603.35.943s-.127.67-.355.943l.005-.006c-.248.297-.647.528-1.345.934l-3.907 2.272-2.24 1.301-1.566.911a2.437 2.437 0 01-2.465.044c-.543-.29-.985-.802-1.189-1.515L12 17.985l1.11-.646 2.24-1.3z" />
                    </svg>
                    <span>
                      <small>Get it on</small>
                      <strong>Google Play</strong>
                    </span>
                  </a>
                </div>
              </div>
              <div className="app-preview"></div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};


export default Home;