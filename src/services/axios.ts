import axios from "axios";
import nookies from "nookies";

export function getAPIClient() {
  const token = nookies.get(null)['donilabauth.token'];
 
  const api = axios.create({
    baseURL: `/api`
  })
 
  api.interceptors.request.use(config => {
    return config;
  })
 
  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  // Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      nookies.destroy(null, 'donilabauth.token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);
 
  return api;
}
export function getAPIServer() {
  const token = nookies.get(null)['donilabauth.token'];
 
  const api = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`
  })
 
  api.interceptors.request.use(config => {
    return config;
  })
 
  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
 
  return api;
}