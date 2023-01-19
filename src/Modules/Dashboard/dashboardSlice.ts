import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    createdEventData: [],
    isEventDataLoading: true,
  },
  reducers: {
    handleCreateEventData: (state, action) => {
      state.createdEventData = [action.payload, ...state.createdEventData];
    },
    handleEventDataLoading: (state, action) => {
      state.isEventDataLoading = action.payload;
    },

    handleEventDelete: (state, action) => {
      state.createdEventData = state.createdEventData.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  handleCreateEventData,
  handleEventDataLoading,
  handleEventDelete,
} = dashboardSlice.actions;

// export const {selectCreateEventData} = useSelector((state : any) => state.dashboard);

export default dashboardSlice.reducer;
