import { useSelector, useDispatch } from 'react-redux';
import { incrementVote } from '../reducers/anecdoteReducer';
import { setNotification, showNotification } from '../reducers/notificationReducer';
import Notification from './Notification';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes
      .filter(({ content }) => content.includes(filter))
      .sort((a, b) => b.votes - a.votes)
  });
  const dispatch = useDispatch();

  const vote = ({ id, content }) => {
    dispatch(incrementVote(id));
    dispatch(setNotification(`you voted '${content}'`, 5));
  }

  return (
    <div>
      <Notification />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
};

export default AnecdoteList;