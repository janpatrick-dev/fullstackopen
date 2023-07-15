import { useState } from 'react';
import Notification from './Notification';

const Login = ({ handleLogin, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    handleLogin(e, username, password);
    setUsername('');
    setPassword('');
  }

  return (
    <div>
      <h2>log in to application</h2>
      <Notification className='error' message={error} />
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='username'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
};

export default Login;