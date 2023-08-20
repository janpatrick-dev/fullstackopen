import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOGIN } from "../queries";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ token, setToken }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ login, result ] = useMutation(LOGIN);

  useEffect(() => {
    if (result.data) {
      const tokenValue = result.data.login.value;
      setToken(tokenValue);
      localStorage.setItem('user-token', tokenValue);
      navigate('/');
    }
  }, [result.data]);

  const submit = async (e) => {
    e.preventDefault();

    login({ variables: { username, password } });

    setUsername('');
    setPassword('');
  }

  if (token) {
    return null;
  }

  return (
    <form onSubmit={submit}>
      <div>
        name <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        password <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  );
};

export default LoginForm;