import axios from "axios";
import nookies from "nookies";

export function getAPIClient() {
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