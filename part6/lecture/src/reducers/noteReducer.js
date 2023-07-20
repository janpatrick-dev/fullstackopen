import { createSlice } from '@reduxjs/toolkit';

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {
      state.push(action.payload);
    },
    toggleImportanceOf(state, action) {
      const id = action.payload;
      const noteToChange = state.find(n => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      };

      return state.map(note => note.id !== id ? note : changedNote);
    },
    setNotes(state, action) {
      return action.payload;
    }
  }
});

// const noteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'NEW_NOTE':
//       return [...state, action.payload];
//     case 'TOGGLE_IMPORTANCE':
//       const id = action.payload.id;
//       const noteToChange = state.find(n => n.id === id);
//       const changedNote = {
//         ...noteToChange,
//         important: !noteToChange.important
//       };
//       return state.map(note => 
//         note.id !== id ? note : changedNote
//       );
//     default:
//       return state;
//   }
// };

// export const createNote = (content) => {
//   return {
//     type: 'NEW_NOTE',
//     payload: {
//       content,
//       important: false,
//       id: generateId()
//     }
//   };
// }

// export const toggleImportanceOf = (id) => {
//   return {
//     type: 'TOGGLE_IMPORTANCE',
//     payload: { id }
//   };
// }

export const { createNote, toggleImportanceOf, appendNote, setNotes } = noteSlice.actions;
export default noteSlice.reducer;