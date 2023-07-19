import { useDispatch, useSelector } from 'react-redux';
import { toggleImportanceOf } from '../reducers/noteReducer';

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      { note.content }
      <strong>{ note.important ? 'important' : '' }</strong>
    </li>
  )
};

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(({ filter, notes }) => {
    switch (filter) {
      case 'IMPORTANT':
        return notes.filter((note) => note.important);
      case 'NONIMPORTANT':
        return notes.filter((note) => !note.important);
      case 'ALL':
      default:
        return notes;
    }
  });

  return (
    <ul>
      {notes.map((note) =>
        <Note 
          key={note.id}
          note={note}
          handleClick={() => 
            dispatch(toggleImportanceOf(note.id))
          }
        />
      )}
    </ul>
  );
};

export default Notes;