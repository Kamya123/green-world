import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`; // Ensure this matches your backend URL

export const register = (user) => {
  return axios.post(`${API_URL}/api/auth/register`, user);
};

export const login = (user) => {
  return axios.post(`${API_URL}/api/auth/login`, user);
};

export const verifyOTP = (data) => {
  return axios.post(`${API_URL}/api/auth/verify-otp`, data);
};

export const sendPhoneOTP = (phone) => {
  return axios.post(`${API_URL}/api/auth/send-phone-otp`, { phone });
};

export const verifyPhoneOTP = (data) => {
  return axios.post(`${API_URL}/api/auth/verify-phone-otp`, data);
};

export const forgotPassword = ({email, phone, signUpMethod}) => {
  return axios.post(`${API_URL}/api/auth/forgot-password`, { email, phone, signUpMethod });
};

export const verifyOtpForgot = ({ email, phone, otp, signUpMethod }) => {
  return axios.post(`${API_URL}/api/auth/verify-otp-forgot`, {  email, phone, otp, signUpMethod  });
}

export const resetPassword = ({ resetToken, newPassword }) => {
  return axios.post(`${API_URL}/api/auth/reset-password`, { resetToken, newPassword });
}
