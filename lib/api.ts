import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3334/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('donilabtoken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('donilabtoken');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default api;