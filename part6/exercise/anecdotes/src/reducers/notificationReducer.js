import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: ''
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification(state, action) {
      return { message: action.payload };
    },
    clearNotification(state, action) {
      return { message: '' };
    }
  }
});

export const { showNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (message, duration) => {
  return async (dispatch) => {
    dispatch(showNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, duration * 1000);
  };
}

export default notificationSlice.reducer;