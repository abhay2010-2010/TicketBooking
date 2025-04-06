import { useState, useEffect } from "react";
import "./SeatGrid.css"; 

const SeatGrid = ({ seats, loading = false }) => {
  const [seatsByRow, setSeatsByRow] = useState({});

  useEffect(() => {
    // Group seats by row
    const groupedSeats = {};
    seats.forEach((seat) => {
      if (!groupedSeats[seat.rowNumber]) {
        groupedSeats[seat.rowNumber] = [];
      }
      groupedSeats[seat.rowNumber].push(seat);
    });

    // Sort seats within each row
    Object.keys(groupedSeats).forEach((rowNum) => {
      groupedSeats[rowNum].sort((a, b) => a.seatNumber - b.seatNumber);
    });

    setSeatsByRow(groupedSeats);
  }, [seats]);

  const getSeatClass = (seat) => {
    return `seat-grid-seat ${
      seat.isBooked ? "seat-grid-booked" : "seat-grid-available"
    }`;
  };

  return (
    <div className="seat-grid">
      {loading ? (
        <>
          <div className="seat-grid-skeleton seat-grid-skeleton-title"></div>
          <div className="seat-grid-skeleton seat-grid-skeleton-indicators"></div>
          <div className="seat-grid-skeleton-rows">
            {[1, 2, 3, 4].map((item) => (
              <div
                className="seat-grid-skeleton seat-grid-skeleton-row"
                key={item}
              ></div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="seat-grid-title">Seat Availability</h2>

          <div className="seat-grid-indicators">
            <div className="seat-grid-indicator">
              <span className="seat-grid-indicator-box seat-grid-indicator-available"></span>
              <span className="seat-grid-indicator-text">Available</span>
            </div>
            <div className="seat-grid-indicator">
              <span className="seat-grid-indicator-box seat-grid-indicator-booked"></span>
              <span className="seat-grid-indicator-text">Booked</span>
            </div>
          </div>

          <div className="seat-grid-container">
            {Object.keys(seatsByRow)
              .sort((a, b) => Number(a) - Number(b))
              .map((rowNum) => (
                <div key={rowNum} className="seat-grid-row">
                  <div className="seat-grid-row-number">Row {rowNum}</div>
                  <div className="seat-grid-seats">
                    {seatsByRow[rowNum].map((seat) => (
                      <div
                        key={seat.seatNumber}
                        className={getSeatClass(seat)}
                        // title={`Seat ${seat.seatNumber} - ${
                        //   seat.isBooked ? "Booked" : "Available"
                        // }`}
                      >
                        {seat.seatNumber}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SeatGrid;
