import { createSlice } from "@reduxjs/toolkit";

// Load initial auth state from localStorage
const loadAuthFromStorage = () => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    const user = localStorage.getItem("user");
    if (jwtToken && user) {
      return {
        jwtToken,
        user: JSON.parse(user),
        isAuthenticated: true,
      };
    }
  } catch (error) {
    console.error("Failed to load auth from localStorage:", error);
  }
  return {
    jwtToken: null,
    user: null,
    isAuthenticated: false,
  };
};

const initialState = loadAuthFromStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { jwtToken, user } = action.payload;
      state.jwtToken = jwtToken;
      state.user = user;
      state.isAuthenticated = true;

      // Sync with localStorage
      localStorage.setItem("jwtToken", jwtToken);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: (state) => {
      state.jwtToken = null;
      state.user = null;
      state.isAuthenticated = false;

      // Clear from localStorage
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("user");
    },
    updateUser: (state, action) => {
      state.user = action.payload;

      // Sync with localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { loginSuccess, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectJwtToken = (state) => state.auth.jwtToken;
export const selectAuthState = (state) => state.auth;
