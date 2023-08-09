import Blog from './Blog';
import CreateBlogForm from './CreateBlogForm';
import Togglable from './Togglable';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from '../reducers/blogsReducer';

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  return (
    <div>
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