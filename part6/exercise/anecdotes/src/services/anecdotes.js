import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecdote = async (content) => {
  const body = { content, votes: 0 };
  const response = await axios.post(baseUrl, body);
  return response.data;
}

const incrementVoteOf = async (id) => {
  const anecdotes = await getAll();
  const target = anecdotes.find((a) => a.id === id);
  const body = { ...target, votes: target.votes + 1 };
  const response = await axios.put(`${baseUrl}/${id}`, body, { new: true });
  return response.data;
}

export default { getAll, createAnecdote, incrementVoteOf };