import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
  const { id } = useParams();
  const users = useSelector(state => state.users.allUsers);
  const user = users.find(user => user.id === id);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {user.blogs.map((blog) =>
        <li key={blog.id}>{blog.title}</li>
      )}
    </div>
  );
};

export default User;