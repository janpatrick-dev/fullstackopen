import { useState, useEffect } from 'react';
import loginService from './services/login';
import blogService from './services/blogs';
import Blogs from './components/Blogs';
import Login from './components/Login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );  
  }, []);

  const handleLogin = async (e, username, password) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      setUser(user);
    } catch (exception) {
      console.error(exception);
    }
  };

  if (user === null) {
    return <Login handleLogin={handleLogin} />;
  }

  return (
    <div>
      <Blogs blogs={blogs} />
    </div>
  )
}

export default App