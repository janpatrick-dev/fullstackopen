import axios from 'axios';

const baseUrl = 'http://localhost:3001/notes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getById = async (id) => {
  const notes = await getAll();
  return notes.find((n) => n.id === id);
}

const createNew = async (content) => {
  const object = { content, important: false };
  const response = await axios.post(baseUrl, object);
  return response.data;
}

const toggleImportance = async (id) => {
  const noteToUpdate = await getById(id);
  const updatedNote = { ...noteToUpdate, important: !noteToUpdate.important };
  const response = await axios.put(`${baseUrl}/${id}`, updatedNote, { new: true });
  return response.data;
}

export default { getAll, getById, createNew, toggleImportance };