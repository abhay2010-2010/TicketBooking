import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL
});

// Add a request interceptor to add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Seats API
export const getSeats = () => api.get('/seats');
export const getAvailableSeats = () => api.get('/seats/available');
export const initializeSeats = () => api.post('/seats/init');
export const resetSeats = () => api.post('/seats/reset');

// Booking API
export const bookSeats = (numberOfSeats) => api.post('/booking', { numberOfSeats });
export const getBookings = () => api.get('/booking');
export const cancelBooking = (bookingId) => api.delete(`/booking/${bookingId}`);

export default api;