import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import blogsReducer from './reducers/blogsReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    'users': userReducer,
    'blogs': blogsReducer,
    'notification': notificationReducer
  },
});

export default store;