import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: 'Full Stack Open - Part 6!!',
  show: false
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setMessage(state, action) {
      return { ...state, message: action.payload }
    },
    showNotification(state, action) {
      return { ...state, show: action.payload }
    }
  }
});

export const { setMessage, showNotification } = notificationSlice.actions;
export default notificationSlice.reducer;