import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../reducers/userReducer';

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (!user) {
    return null;
  }

  return (
    <div style={{ backgroundColor: '#ccc' }}>
      <Link to='/'>blogs</Link>&nbsp;
      <Link to='/users'>users</Link>&nbsp;
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Navigation;