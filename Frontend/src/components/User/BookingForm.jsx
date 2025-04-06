// import { useState } from "react";
// import "./BookingForm.css"; // Make sure to create this CSS file

// const BookingForm = ({ onSubmit, maxSeats = 7, loading = false }) => {
//   const [numberOfSeats, setNumberOfSeats] = useState(1);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(numberOfSeats);
//   };

//   return (
//     <div className="booking-form">
//       {loading ? (
//         <>
//           <div className="booking-form skeleton booking-form-skeleton-title"></div>
//           <div className="booking-form skeleton booking-form-skeleton-card"></div>
//         </>
//       ) : (
//         <>
//           <h2 className="booking-form-title">Book Seats</h2>
//           <div className="booking-form-card">
//             <form onSubmit={handleSubmit}>
//               <div className="booking-form-group">
//                 <label htmlFor="numberOfSeats" className="booking-form-label">
//                   Number of Seats:
//                 </label>
//                 <input
//                   type="number"
//                   id="numberOfSeats"
//                   min="1"
//                   max={maxSeats}
//                   value={numberOfSeats}
//                   onChange={(e) => setNumberOfSeats(Number(e.target.value))}
//                   className="booking-form-control"
//                 />
//                 <span className="booking-form-max-seats">
//                   Max: {maxSeats} seats
//                 </span>
//               </div>
//               <button type="submit" className="booking-form-button">
//                 Book Seats
//               </button>
//             </form>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default BookingForm;
