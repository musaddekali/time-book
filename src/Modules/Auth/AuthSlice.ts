import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth_user',
  initialState: {
    user: {
      user_name: '',
      user_email: '',
      user_image: '',
      token: ''
    }
  },
  reducers: {
    setUser: (state, action) => {
      state.user.user_email = action.payload?.email;
      state.user.user_name = action.payload?.displayName;
      state.user.user_image = action.payload?.photoURL;
      state.user.token = action.payload?.token;
    }
  }
})

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
