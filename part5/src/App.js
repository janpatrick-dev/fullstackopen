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

  useEffect(() => {
    const savedUserJSON = localStorage.getItem('currentUser');
    if (savedUserJSON) {
      setUser(JSON.parse(savedUserJSON));
    }
  }, [])

  const handleLogin = async (e, username, password) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('currentUser', JSON.stringify(user));
      setUser(user);
    } catch (exception) {
      console.error(exception);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('currentUser');
    setUser(null);
  }

  if (user === null) {
    return <Login handleLogin={handleLogin} />;
  }

  return (
    <div>
      <Blogs 
        blogs={blogs} 
        user={user}
        handleLogout={handleLogout} 
      />
    </div>
  )
}

export default App