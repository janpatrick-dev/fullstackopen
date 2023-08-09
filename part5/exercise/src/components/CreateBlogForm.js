import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';

const CreateBlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreate = async (blogBody) => {
    blogFormRef.current.toggleVisibility();
    try {
      const blog = await dispatch(createNewBlog({ ...blogBody, user: user }));
      dispatch(setNotification(`a new blog ${blog.title} by ${blog.author}`));
    } catch (exception) {
      dispatch(setNotification(exception.message, false));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreate({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            id='title'
            type='text'
            value={title}
            name='title'
            onChange={(e) => setTitle(e.target.value)}
            placeholder='title'
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type='text'
            value={author}
            name='author'
            onChange={(e) => setAuthor(e.target.value)}
            placeholder='author'
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type='text'
            value={url}
            name='url'
            onChange={(e) => setUrl(e.target.value)}
            placeholder='url'
          />
        </div>
        <button type='submit' data-testid='createBlogButton'>
          create
        </button>
      </form>
    </div>
  );
};

export default CreateBlogForm;