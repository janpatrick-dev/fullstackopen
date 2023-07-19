import { useSelector, useDispatch } from 'react-redux'
import { incrementVoteOf, createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes));
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(incrementVoteOf(id));
  }

  const newAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    dispatch(createAnecdote(content));
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div><input type='text' name='anecdote' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App