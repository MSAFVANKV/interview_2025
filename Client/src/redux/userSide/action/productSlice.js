import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Fetch_Single_Product_Api } from "../../../routers/product-api";

// Initial state
const initialState = {
  products: null,
  token: null,
  isLoading: false,
  error: null,
};

// Async thunk for login
export const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingleProduct",
  async (slugId, { rejectWithValue }) => {
    try {
      // console.log(slugId);
      
      const response = await Fetch_Single_Product_Api(slugId);
      // console.log(response);
      return response.data;

    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network error"
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductData: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload || "Unknown error";
      });
  },
});

export const { setProductData } = productSlice.actions;

export default productSlice.reducer;

// Selector to get the auth state
export const selectAuth = (state) => state.auth;
