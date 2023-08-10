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

  return (
    <div style={blogStyle} className='blog'>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  );
};

BlogRow.propTypes = {
  blog: PropType.object.isRequired,
};

export default BlogRow;