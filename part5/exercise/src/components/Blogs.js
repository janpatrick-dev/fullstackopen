import Blog from './Blog';
import Notification from './Notification';
import CreateBlogForm from './CreateBlogForm';
import Togglable from './Togglable';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from '../reducers/blogsReducer';
import { logoutUser } from '../reducers/userReducer';

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);
  const success = useSelector(state => state.notification.success);
  const error = useSelector(state => state.notification.error);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

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
      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <CreateBlogForm blogFormRef={blogFormRef} />
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </div>
  );
};

export default Blogs;