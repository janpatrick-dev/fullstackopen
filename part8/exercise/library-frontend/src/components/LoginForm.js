import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOGIN } from "../queries";

const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ login, result ] = useMutation(LOGIN);

  const submit = (e) => {
    e.preventDefault();

    login({ variables: { username, password } });

    setUsername('');
    setPassword('');
  }

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      localStorage.setItem('user-token', token);
      setToken(token);
      setPage('authors');
    }
  }, [result.data]);

  if (!show) {
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