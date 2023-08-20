import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { Routes, Route } from 'react-router-dom';
import UserActions from './components/UserActions'
import { useQuery, useSubscription } from '@apollo/client'
import { BOOK_ADDED, USER } from './queries'

const App = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const userQuery = useQuery(USER);

  useEffect(() => {
    if (userQuery.data && userQuery.data.me) {
      setUser(userQuery.data.me);
    }
  }, [userQuery]);

  useEffect(() => {
    const tokenLocal = localStorage.getItem('user-token');
    if (tokenLocal) {
      setToken(tokenLocal);
    }
  }, []);

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      alert(data);
    }
  });

  return (
    <div>
      <UserActions token={token} setToken={setToken} />

      <Routes>
        <Route path='/' element={<Authors setUser={setUser} />} />
        <Route path='/books' element={<Books />} />
        <Route path='/books/new' element={<NewBook />} />
        <Route path='/recommendations' element={<Recommendations user={user} />} />
        <Route path='/login' element={<LoginForm setToken={setToken} token={token} />} />
      </Routes>
    </div>
  )
}

export default App
