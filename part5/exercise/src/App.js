import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Blogs from './components/Blogs';
import Login from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUser, logoutUser } from './reducers/userReducer';
import Notification from './components/Notification';
import Users from './components/Users';
import User from './components/User';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const success = useSelector(state => state.notification.success);
  const error = useSelector(state => state.notification.error);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  if (user === null) {
    return <Login />;
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        className={error ? 'error' : 'success'}
        message={error || success} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
