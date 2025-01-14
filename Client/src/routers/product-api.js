import axios from "axios";
import { PRODUCT_ADD, SINGLE_PRODUCTS, UPDATE_PRODUCTS } from "./urlPth";

const API = axios.create({
  baseURL: "http://localhost:3000/",
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
