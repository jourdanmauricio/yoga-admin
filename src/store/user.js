import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import { useNotification } from "../commons/Notifications/NotificationProvider";

export const signUp = createAsyncThunk(
  "user/signUp",
  async ({ credentials }) => {
    // async operation
    const response = await Axios.post(`${apiConfig.domain}/users`, {
      user: credentials,
    });
    return response.data.user;
  }
);

export const signIn = createAsyncThunk("user/signIn", async (data) => {
  const API_URL = `${import.meta.env.VITE_BACKEND_API}/auth/login`;
  // async operation
  const response = await Axios.post(API_URL, data);

  return response.data.user;
});

let userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "",
  },
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.status = "";
    },
  },
  extraReducers: {
    [signUp.pending]: (state, action) => {
      state.status = "loading";
    },
    [signUp.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "success";
    },
    [signUp.rejected]: (state, action) => {
      state.status = "failed";
    },

    [signIn.pending]: (state, action) => {
      state.status = "loading";
    },
    [signIn.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "success";
    },
    [signIn.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { logOut } = userSlice.actions;

export default userSlice.reducer;
