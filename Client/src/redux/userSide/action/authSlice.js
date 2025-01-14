import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Fetch_User } from "../../../routers/api";

// Initial state
const initialState = {
  user: null,
  token: null,
  isLoading: false,
  isLogged:false,
  error: null,
};

// Async thunk for login
export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Fetch_User();
      console.log(response);
      
      if (response.data.success === true) {
        return response.data.user;
      } else {
        return rejectWithValue("Failed to fetch admin details");
      }
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Network error"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutState: (state) => {
      state.user = null;
      state.token = null;
      state.isLogged = false;
    },
    setUserData: (state, action) => {
      state.user = action.payload;
      state.isLogged = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      state.isLogged = true;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isLogged = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

export const { logoutState, setUserData } = authSlice.actions;

export default authSlice.reducer;

// Selector to get the auth state
export const selectAuth = (state) => state.auth;
