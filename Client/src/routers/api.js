import axios from 'axios';
import { FETCH_USER_DATA, LOGIN_USER_URL, USER_LOGOUT } from './urlPth';

const API = axios.create({
  // baseURL: 'http://localhost:3000/',
  baseURL: 'https://cybpress-backent.onrender.com/',

  withCredentials: true, 
});

export const Login_Api = async (data) => 
  await API.post(LOGIN_USER_URL,data, { withCredentials: true });


export const Fetch_User = async () => 
  await API.get(FETCH_USER_DATA,{}, { withCredentials: true });

export const logout = async () => 
  await API.post(USER_LOGOUT,{}, { withCredentials: true });
