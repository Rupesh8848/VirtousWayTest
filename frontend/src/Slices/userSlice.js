import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../BaseUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const signUpUser = createAsyncThunk(
  "user/register",
  async (formData, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await axios.post(`${baseUrl}user/register`, formData);
      console.log(response.data);
      localStorage.setItem("userData", JSON.stringify(response?.data));
      if (response?.data?.exception) {
        toast.error(response?.data?.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.success("Account successfully created.");
        setTimeout(() => {
          window.location.pathname = "/note";
        }, 2000);
      }
      return response?.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const signInUser = createAsyncThunk(
  "user/login",
  async (formData, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await axios.post(`${baseUrl}user/login`, formData);
      console.log(response.data);
      localStorage.setItem("userData", JSON.stringify(response?.data));
      if (response?.data?.exception) {
        toast.error(response?.data?.error);
      } else {
        toast.success("Login Successful.");
        setTimeout(() => {
          window.location.pathname = "/note";
        }, 2000);
      }
      return response?.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const userFromLocalStorage = JSON.parse(localStorage.getItem("userData"));

const userSlice = createSlice({
  name: "User",
  initialState: {
    userData: userFromLocalStorage,
    userIsLoggedIn: !!userFromLocalStorage?.token,
  },
  reducers: {
    logoutUser: (state, action) => {
      localStorage.clear();
      state.userData = null;
      state.userIsLoggedIn = false;
      // window.location.pathname = "/login";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.appErr = undefined;
        state.serveErr = undefined;
        state.userIsLoggedIn = true;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serveErr = action?.error?.message;
      })
      .addCase(signInUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.appErr = undefined;
        state.serveErr = undefined;
        state.userIsLoggedIn = true;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serveErr = action?.error?.message;
      });
  },
});

export default userSlice.reducer;
export const { logoutUser } = userSlice.actions;
