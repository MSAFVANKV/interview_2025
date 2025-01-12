import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  user: null,
  token: null,
  isLoading: false,
  isLogged:false,
  error: null,
};

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || "Failed to login");
      }

      return { user: data.user, token: data.token }; // Assuming data contains { user, token }
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Failed to login");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
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
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogged = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isLogged = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

export const { logout, setUserData } = authSlice.actions;

export default authSlice.reducer;

// Selector to get the auth state
export const selectAuth = (state) => state.auth;
