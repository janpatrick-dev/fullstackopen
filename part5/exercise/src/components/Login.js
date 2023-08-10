import { useState } from 'react';
import Notification from './Notification';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { loginUser } from '../reducers/userReducer';

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(state => state.notification.error);

  const handleLogin = async (username, password) => {
    try {
      const loggedInUser = await dispatch(loginUser({ username, password }));
      dispatch(setNotification(`Hello, ${loggedInUser.name}`));
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, false));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div>
      <h2>log in to application</h2>
      <Notification className='error' message={error} />
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id='username'
            type='text'
            value={username}
            name='username'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            value={password}
            name='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit' data-testid='loginButton'>
          login
        </button>
      </form>
    </div>
  );
};

export default Login;