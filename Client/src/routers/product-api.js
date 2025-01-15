import axios from "axios";
import { BANNERS_ADD, BANNERS_DELETE, BANNERS_FETCH, PRODUCT_ADD, SINGLE_PRODUCTS, UPDATE_PRODUCTS } from "./urlPth";
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

export const Create_Product_Api = async (formData) =>
  await API.post(
    `${PRODUCT_ADD}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );

export const Fetch_Single_Product_Api = async (id) =>
  await API.get(`${SINGLE_PRODUCTS}/${id}`, {}, { withCredentials: true });

export const Update_Single_Product_Api = async (formData,id) =>
  await API.put(`${UPDATE_PRODUCTS}/${id}`, formData, { withCredentials: true });


// ====== banner ========
export const Create_Banners_Api = async (formData) =>
  await API.post(
    `${BANNERS_ADD}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );

  export const Fetch_Banners_Api = async () =>
    await API.get(`${BANNERS_FETCH}`, {}, { withCredentials: true });

  export const Delete_Single_Banner_Api = async (data) =>
    await API.delete(`${BANNERS_DELETE}`, data, { withCredentials: true });