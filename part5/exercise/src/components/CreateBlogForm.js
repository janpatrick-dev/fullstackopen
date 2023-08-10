import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';
import { Button, TextField } from '@mui/material';


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
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          type='text'
          value={title}
          name='title'
          onChange={(e) => setTitle(e.target.value)}
          placeholder='title'
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Author"
          variant="outlined"
          type='text'
          value={author}
          name='author'
          onChange={(e) => setAuthor(e.target.value)}
          placeholder='author'
        />
        <br />
        <TextField
          id="outlined-basic"
          label="URL"
          variant="outlined"
          type='text'
          value={url}
          name='url'
          onChange={(e) => setUrl(e.target.value)}
          placeholder='url'
        />
        <br />
        <Button type='submit' variant='contained'>
          create
        </Button>
      </form>
    </div>
  );
};

export default CreateBlogForm;