import Togglable from "./Togglable";

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButton = () => {
    if (blog.user.username === user.username) {
      return <button onClick={(e) => handleDelete(e, blog)}>remove</button>
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <Togglable buttonLabel='view' type='blog'>
          <div>{ blog.url }</div>
          <div>
            likes { blog.likes }
            <button onClick={(e) => handleLike(e, blog)}>like</button>
          </div>
          <div>{ blog.user && blog.user.name }</div>
          { removeButton() }
        </Togglable>
      </div>
    </div> 
  );
}
 

export default Blog