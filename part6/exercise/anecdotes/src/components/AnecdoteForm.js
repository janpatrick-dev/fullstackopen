import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const newAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    dispatch(createAnecdote(content));
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div><input type='text' name='anecdote' /></div>
        <button>create</button>
      </form>
    </div>
  )
};

export default AnecdoteForm;