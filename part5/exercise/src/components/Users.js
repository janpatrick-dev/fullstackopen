import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUsers } from '../reducers/userReducer';
import { Link } from 'react-router-dom';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.allUsers);

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map((user) =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;