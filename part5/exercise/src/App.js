import { useState, useEffect, useRef } from 'react';
import loginService from './services/login';
import blogService from './services/blogs';
import Blogs from './components/Blogs';
import Login from './components/Login';
import NotifHelper from './utils/notificationHelper';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );  
  }, []);

  useEffect(() => {
    const savedUserJSON = localStorage.getItem('currentUser');
    if (savedUserJSON) {
      const savedUser = JSON.parse(savedUserJSON);
      setUser(savedUser);
      loginService.setToken(savedUser.token);
    }
  }, [])

  const handleLogin = async (e, username, password) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('currentUser', JSON.stringify(user));
      loginService.setToken(user.token);
      setUser(user);
      NotifHelper.showSuccess(setSuccess, `Hello, ${user.name}`);
    } catch (exception) {
      console.error(exception);
      NotifHelper.showError(setError, exception.response.data.error);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('currentUser');
    setUser(null);
  }

  const blogFormRef = useRef();
  const handleCreateBlog = async (e, blogBody) => {
    e.preventDefault();

    blogFormRef.current.toggleVisibility();
    try {
      const blog = await blogService.create(blogBody);
      setBlogs([...blogs, blog]);
      NotifHelper.showSuccess(
        setSuccess, 
        `a new blog ${blog.title} by ${blog.author}`
      );
    } catch (exception) {
      NotifHelper.showError(setError, exception.message);
    }
  }

  if (user === null) {
    return <Login handleLogin={handleLogin} error={error} />;
  }

  return (
    <div>
      <Blogs 
        blogs={blogs} 
        user={user}
        handleLogout={handleLogout}
        handleCreateBlog={handleCreateBlog}
        blogFormRef={blogFormRef}
        error={error}
        success={success}
      />
    </div>
  )
}

export default App