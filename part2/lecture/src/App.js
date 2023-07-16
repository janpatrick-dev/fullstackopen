import { useState, useEffect, useRef } from 'react';
import noteService from './services/notes';
import loginService from './services/login';
import Note from "./components/Note";
import Notification from './components/Notification';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import NoteForm from './components/NoteForm';

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => setNotes(initialNotes))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, [])

  const notesToShow = showAll 
    ? notes 
    : notes.filter(note => note.important);

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteService
      .create(noteObject)
      .then((returnedNote) => {
        setNotes([...notes, returnedNote]);
      })
      .catch((exception) => {
        setErrorMessage(exception.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map(n => n.id !== id ? n : returnedNote));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id));
      })
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      );
      noteService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage('Invalid credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000)
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteAppUser');
    setUser('');
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const noteFormRef = useRef();

  const noteForm = () => (
    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm 
        createNote={addNote}
      />
    </Togglable>
  );

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          {noteForm()}
        </div>
      )}
      
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => 
          <Note 
            key={note.id} 
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <Footer />
    </div>
  );
}

export default App;
