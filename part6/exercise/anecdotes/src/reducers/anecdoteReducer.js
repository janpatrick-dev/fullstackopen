import { createSlice } from '@reduxjs/toolkit';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    createAnecdote(state, action) {
      console.log(action.payload);
      return [...state, action.payload];
    },
    incrementVoteOf(state, action) {
      const id = action.payload;
      const target = state.find((anecdote) => anecdote.id === id);
      return state.map((anecdote) => {
        if (anecdote.id === id) {
          return { ...target, votes: target.votes + 1 };
        }
        return anecdote;
      });
    }
  }
});

export const { setAnecdotes, createAnecdote, incrementVoteOf } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;