import PropType from 'prop-types';
import { Link } from 'react-router-dom';

const BlogRow = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  // const handleLike = async (e, blog) => {
  //   e.preventDefault();

  //   await dispatch(incrementBlogLikes(blog));
  // };

  // const handleDelete = async (e, blogToDelete) => {
  //   e.preventDefault();

  //   await dispatch(deleteBlog(blogToDelete));
  // };

  // const removeButton = () => {
  //   if (blog.user.username === user.username) {
  //     return (
  //       <button onClick={(e) => handleDelete(e, blog)} data-testid='removeButton'>
  //         remove
  //       </button>
  //     );
  //   }
  // };

  return (
    <div style={blogStyle} className='blog'>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
        {/* <Togglable buttonLabel='view' type='blog' className='blogTogglable'>
          <div>{ blog.url }</div>
          <div>
            <span data-testid='blogLikes'>
              likes { blog.likes }
              <button onClick={(e) => handleLike(e, blog)}>like</button>
            </span>
          </div>
          <div>{ blog.user && blog.user.name }</div>
          { removeButton() }
        </Togglable> */}
      </Link>
    </div>
  );
};

BlogRow.propTypes = {
  blog: PropType.object.isRequired,
};

export default BlogRow;