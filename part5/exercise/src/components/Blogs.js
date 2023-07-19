import Blog from './Blog';
import Notification from './Notification';
import CreateBlogForm from './CreateBlogForm';
import Togglable from './Togglable';

const Blogs = (props) => {
  const {
    blogs,
    user,
    handleLogout,
    handleCreateBlog,
    handleLike,
    handleDelete,
    blogFormRef,
    error,
    success
  } = props;

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
        <CreateBlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Blogs;