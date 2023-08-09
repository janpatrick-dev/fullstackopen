import { useEffect } from 'react';
import Blogs from './components/Blogs';
import Login from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  if (user === null) {
    return <Login />;
  }

  return (
    <div>
      <Blogs />
    </div>
  );
};

export default App;
