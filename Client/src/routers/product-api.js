import axios from "axios";
import { BANNERS_ADD, BANNERS_FETCH, PRODUCT_ADD, SINGLE_PRODUCTS, UPDATE_PRODUCTS } from "./urlPth";

const API = axios.create({
  baseURL: "https://cybpress-backent.onrender.com/",
  withCredentials: true,
});

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