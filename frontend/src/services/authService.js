import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth'; // Ensure this matches your backend URL

export const register = (user) => {
  return axios.post(`${API_URL}/register`, user);
};

export const login = (user) => {
  return axios.post(`${API_URL}/login`, user);
};

export const verifyOTP = (data) => {
  return axios.post(`${API_URL}/verify-otp`, data);
};
