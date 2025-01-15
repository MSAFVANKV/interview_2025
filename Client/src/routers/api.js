import axios from 'axios';
import { FETCH_USER_DATA, LOGIN_USER_URL, USER_LOGOUT } from './urlPth';
import Cookies from "js-cookie"; 

const API = axios.create({
  // baseURL: 'http://localhost:3000/',
  baseURL: 'https://cybpress-backent.onrender.com/',

  withCredentials: true, 
});

API.interceptors.request.use(
  (config) => {
    const token = Cookies.get("us-tkn"); // Get the 'us-tkn' token using js-cookie
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const Login_Api = async (data) => 
  await API.post(LOGIN_USER_URL,data, { withCredentials: true });


export const Fetch_User = async () => 
  await API.get(FETCH_USER_DATA,{}, { withCredentials: true });

export const logout = async () => 
  await API.post(USER_LOGOUT,{}, { withCredentials: true });
