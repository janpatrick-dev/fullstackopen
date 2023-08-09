import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUsers } from '../reducers/userReducer';

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
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users.map((user) =>
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </table>
    </div>
  );
};

export default Users;