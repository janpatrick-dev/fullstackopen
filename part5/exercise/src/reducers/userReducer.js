import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;

export const initializeUser = () => {
  return async (dispatch) => {
    const savedUserJSON = localStorage.getItem('currentUser');
    if (savedUserJSON) {
      const savedUser = JSON.parse(savedUserJSON);
      dispatch(setUser(savedUser));
      loginService.setToken(savedUser.token);
    }
  };
};

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);

    window.localStorage.setItem('currentUser', JSON.stringify(user));
    loginService.setToken(user.token);
    dispatch(setUser(user));
    return user;
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('currentUser');
    dispatch(clearUser());
  };
};

export default userSlice.reducer;