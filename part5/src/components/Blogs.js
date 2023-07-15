import { useState } from 'react';
import Blog from "./Blog";
import Notification from "./Notification";

const Blogs = (props) => {
  const { 
    blogs, 
    user, 
    handleLogout, 
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs;