import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
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
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    }
  }
});

export const { setAnecdotes, incrementVoteOf, appendAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(content);
    dispatch(appendAnecdote(newAnecdote));
  }
}

export const incrementVote = (id) => {
  return async (dispatch) => {
    await anecdoteService.incrementVoteOf(id);
    dispatch(incrementVoteOf(id));
  }
}

export default anecdoteSlice.reducer;