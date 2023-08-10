import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  success: null,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setSuccess(state, action) {
      return { success: action.payload, error: null };
    },
    setError(state, action) {
      return { success: null, error: action.payload };
    },
    clearNotification() {
      return initialState;
    },
  },
});

export const { setSuccess, setError, clearNotification } =
  notificationSlice.actions;

let notificationTimeout = null;

export const setNotification = (message, success = true) => {
  return async (dispatch) => {
    clearTimeout(notificationTimeout);

    if (success) {
      dispatch(setSuccess(message));
    } else {
      dispatch(setError(message));
    }

    notificationTimeout = setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
};

export default notificationSlice.reducer;
