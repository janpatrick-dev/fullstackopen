import { useState } from 'react';

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('');

  const handleChange = (e) => {
    setNewNote(e.target.value);
  };

  const addNote = (e) => {
    e.preventDefault();
    createNote({
      content: newNote,
      important: true
    });

    setNewNote('');
  };

  return (
    <div className='formDiv'>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          id='note-content'
          type='text'
          value={newNote}
          onChange={handleChange}
          placeholder='write note content here'
        />
        <button type='submit'>save</button>
      </form>
    </div>
  );
};

export default NoteForm;