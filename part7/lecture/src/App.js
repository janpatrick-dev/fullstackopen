import { useState }  from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams, Navigate, useMatch } from 'react-router-dom';
import { Paper, TableBody, TableCell, TableContainer, TableRow, TextField, Button, Table, Alert, AppBar, Toolbar, IconButton } from '@mui/material';

import styled from 'styled-components';

const Btn = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`;

const Input = styled.input`
  margin: 0.25em;
`;

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`;

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`;

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`;

const Home = () => (
  <div> <h2>TKTL notes app</h2> </div>
)

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <TableContainer component={Paper}>
      <Table style={{ marginBottom: 0 }}>
        <TableBody>
          {notes.map((note) => (
            <TableRow key={note.id}>
              <TableCell>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
              </TableCell>
              <TableCell>
                {note.user}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)

const Users = () => (
  <div> <h2>Users</h2> </div>
)

const Login = (props) => {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mluukkai')
    navigate('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username:
          <Input />
        </div>
        <div>
          password:
          <Input type='password' />
        </div>
        <Btn type='submit' primary=''>login</Btn>
      </form>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ])

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  const padding = {
    padding: 5
  }

  const match = useMatch('/notes/:id');
  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null;

  return (
    <Page>

      <Navigation>
        <Link style={padding} to='/'>home</Link>
        <Link style={padding} to='/notes'>notes</Link>
        <Link style={padding} to='/users'>users</Link>
        {user
          ? <em>{user} logged in</em>
          : <Link style={padding} to='/login'>login</Link>
        }
      </Navigation>

      <Routes>
        <Route path='/notes/:id' element={<Note note={note} />} />
        <Route path='/notes' element={<Notes notes={notes} />} />
        <Route path='/users' element={user ? <Users /> : <Navigate replace to='/login' />} />
        <Route path='/login' element={<Login onLogin={login} />} />
        <Route path='/' element={<Home />} />
      </Routes>

      <Footer>
        <em>Note app, Department of Computer Science 2023</em>
      </Footer>
    </Page>
  )
}

export default App;