import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const authSlice = createSlice({
  name: "auth_user",
  initialState: {
    isUserLoading: false,
    user: {
      user_name: "",
      user_email: "",
      user_image: "",
      uid: "",
    },
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user.user_email = payload?.email;
      state.user.user_name = payload?.displayName;
      state.user.user_image = payload?.photoURL;
      state.user.uid = payload?.uid;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload.auth_user,
      };
    },
  },
});

export const { setUser } = authSlice.actions;
export const selectAuth = (state: any) => state.auth_user;

export default authSlice.reducer;
