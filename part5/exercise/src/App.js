import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Blogs from './components/Blogs';
import Login from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUser } from './reducers/userReducer';
import Notification from './components/Notification';
import Users from './components/Users';
import User from './components/User';
import Blog from './components/Blog';
import Navigation from './components/Navigation';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const success = useSelector(state => state.notification.success);
  const error = useSelector(state => state.notification.error);

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  if (user === null) {
    return <Login />;
  }

  return (
    <div>
      <Navigation />
      <h2>blog app</h2>
      <Notification
        className={error ? 'error' : 'success'}
        message={error || success} />
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
