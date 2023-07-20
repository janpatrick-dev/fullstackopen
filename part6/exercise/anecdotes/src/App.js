import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAnecdotes } from './reducers/anecdoteReducer';
import anecdoteService from './services/anecdotes';

import Filter from './components/Filter';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService.getAll().then((anecdotes) => {
      dispatch(setAnecdotes(anecdotes));
    });
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App