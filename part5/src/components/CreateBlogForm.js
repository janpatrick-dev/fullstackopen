import { useState } from 'react';

const CreateBlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    handleCreateBlog(e, { title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='title'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='author'
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            name='url'
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
};

export default CreateBlogForm;