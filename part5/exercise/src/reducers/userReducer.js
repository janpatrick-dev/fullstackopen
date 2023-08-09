import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import userService from '../services/users';

const initialState = {
  user: null,
  allUsers: []
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAllUsers(state, action) {
      return { ...state, allUsers: action.payload };
    },
    setUser(state, action) {
      return { ...state, user: action.payload };
    },
    clearUser(state) {
      return { ...state, user: null };
    }
  }
});

export const { setAllUsers, setUser, clearUser } = userSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getUsers();
    dispatch(setAllUsers(users));
  };
};

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