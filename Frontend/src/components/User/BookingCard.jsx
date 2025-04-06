import React from 'react';
import './BookingCard.css'; // Make sure to create this CSS file

const BookingCard = ({ booking, onCancel, isCancelling }) => {
  // Function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="my-bookings-card">
      <div className="my-bookings-card-header">
        <h3>Booking ID: {booking._id.substring(0, 8)}...</h3>
        <span   className="my-bookings-card-date"> <strong>Booking time:</strong>{formatDate(booking.createdAt)}</span>
      </div>
      
      <div className="my-bookings-card-content">
        <div className="my-bookings-card-info">
        <div className="my-bookings-card-info-item">
            <span className="my-bookings-card-label">Total Seats:</span>
            <span className="my-bookings-card-value">{booking.totalSeats}</span>
          </div>
          <div className="my-bookings-card-info-item">
            <span className="my-bookings-card-label">Seat Numbers:</span>
            <span className="my-bookings-card-value">{booking.seatNumbers.join(', ')}</span>
          </div>
          

          
          {booking.totalAmount && (
            <div className="my-bookings-card-info-item">
              <span className="my-bookings-card-label">Amount Paid:</span>
              <span className="my-bookings-card-value">${booking.totalAmount}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="my-bookings-card-footer">
        <button 
          className="my-bookings-cancel-button"
          onClick={() => onCancel(booking._id)}
          disabled={isCancelling}
        >
          {isCancelling ? 'Cancelling...' : 'Cancel Booking'}
        </button>
      </div>
    </div>
  );
};

export default BookingCard;