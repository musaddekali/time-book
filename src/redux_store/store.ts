import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Modules/Auth/AuthSlice";
import dashboardSlice from "../Modules/Dashboard/dashboardSlice";

// const ntificationSlice = () => ({
//   name: "notification",
//   initialState: {
//     isOpen : false,
//   },
//   reducers: {
//     notify : (state, action) =>{
//       state.isOpen = action.payload;
//     }
//   },
// })


const store = configureStore({
  reducer: {
    auth_user: authReducer,
    dashboard: dashboardSlice,
    // notification: ntificationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

// Can still subscribe to the store
// store.subscribe(() => console.log(store.getState()))
