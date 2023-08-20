import { useApolloClient } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

const UserActions = ({ token, setToken }) => {
  const navigate = useNavigate();
  const client = useApolloClient();
  
  const handleLogout = async () => {
    setToken(null);
    navigate('/login');
    localStorage.clear();
    client.resetStore();
  }

  return (
    <div>
      <Link to='/'><button>authors</button></Link>
      <Link to='/books'><button>books</button></Link>
      {!token && <Link to='/login'><button>login</button></Link>}
      {token && (
        <>
          <Link to='/books/new'><button>add book</button></Link>
          <Link to='/recommendations'><button>recommendations</button></Link>
          <button onClick={handleLogout}>logout</button>
        </>
      )}
    </div>
  )
}

export default UserActions;