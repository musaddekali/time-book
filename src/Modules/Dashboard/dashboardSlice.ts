import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    createdEventData: [],
    isEventDataLoading: true,
  },
  reducers: {
    setAllEventData: (state, action) => {
      state.createdEventData = action.payload;
    },
    handleEventDataLoading: (state, action) => {
      state.isEventDataLoading = action.payload;
    },
    setSingleEvent: (state, action) => {
      state.createdEventData = [action.payload, ...state.createdEventData];
    },
    handleEventDelete: (state, action) => {
      state.createdEventData = state.createdEventData.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  setAllEventData,
  handleEventDataLoading,
  handleEventDelete,
  setSingleEvent,
} = dashboardSlice.actions;

export const selectDashboard = (state: any) => state.dashboard;

export default dashboardSlice.reducer;
