import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth'; // Update with your backend URL

export const register = (user) => {
  return axios.post(`${API_URL}/register`, user);
};

export const login = (user) => {
  return axios.post(`${API_URL}/login`, user);
};
