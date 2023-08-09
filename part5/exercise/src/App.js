import { useState, useEffect, useRef } from 'react';
import loginService from './services/login';
import blogService from './services/blogs';
import Blogs from './components/Blogs';
import Login from './components/Login';
import { setNotification } from './reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const success = useSelector(state => state.notification.success);
  const error = useSelector(state => state.notification.error);

  useEffect(() => {
    console.log(success);
    blogService.getAll().then((blogs) => setBlogs(sortByLikesDesc(blogs)));
  }, []);

  useEffect(() => {
    const savedUserJSON = localStorage.getItem('currentUser');
    if (savedUserJSON) {
      const savedUser = JSON.parse(savedUserJSON);
      setUser(savedUser);
      loginService.setToken(savedUser.token);
    }
  }, []);

  const sortByLikesDesc = (allBlogs) => {
    return allBlogs.sort((a, b) => b.likes - a.likes);
  };

  const handleLogin = async (e, username, password) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('currentUser', JSON.stringify(user));
      loginService.setToken(user.token);
      setUser(user);
      dispatch(setNotification(`Hello, ${user.name}`));
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, false));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('currentUser');
    setUser(null);
  };

  const blogFormRef = useRef();
  const handleCreateBlog = async (blogBody) => {
    blogFormRef.current.toggleVisibility();
    try {
      const blog = await blogService.create(blogBody);
      setBlogs(sortByLikesDesc([...blogs, blog]));
      dispatch(setNotification(`a new blog ${blog.title} by ${blog.author}`));
    } catch (exception) {
      dispatch(setNotification(exception.message, false));
    }
  };

  const handleLike = async (e, blog) => {
    e.preventDefault();

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    await blogService.update(blog.id, updatedBlog);

    const updatedBlogs = blogs.map((b) => {
      if (b.id === updatedBlog.id) {
        return updatedBlog;
      }
      return b;
    });

    setBlogs(sortByLikesDesc(updatedBlogs));
  };

  const handleDelete = async (e, blogToDelete) => {
    e.preventDefault();

    const { title, author, id } = blogToDelete;

    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      await blogService.remove(id);
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  };

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
        handleLike={handleLike}
        handleDelete={handleDelete}
        blogFormRef={blogFormRef}
        error={error}
        success={success}
      />
    </div>
  );
};

export default App;
