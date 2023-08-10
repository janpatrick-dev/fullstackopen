import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { initializeUsers } from '../reducers/userReducer';
import { addComment, incrementBlogLikes } from '../reducers/blogsReducer';

const Blog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const users = useSelector(state => state.users.allUsers);

  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');

  const handleLike = async (e) => {
    e.preventDefault();

    const updatedBlog = await dispatch(incrementBlogLikes(blog));
    console.log(updatedBlog);
    setBlog({ ...blog, likes: updatedBlog.likes });
  };

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = await dispatch(addComment(blog, comment));
    setBlog({ ...blog, comments: [...blog.comments, newComment] });
    setComment('');
  };

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  useEffect(() => {
    setBlog(blogs.find(b => b.id === id));
  }, [users]);

  if (!blog) {
    return null;
  }

  const user = users.find(user => user.id === blog.user.id);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      <div>
        added by {user.name}
      </div>
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <input onChange={handleInputChange} value={comment} />
        <button>add comment</button>
      </form>
      {blog.comments && blog.comments.map((comment) =>
        <li key={comment.id}>{comment.message}</li>
      )}
    </div>
  );
};

export default Blog;