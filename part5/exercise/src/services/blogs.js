import axios from 'axios';
import loginService from './login';

const baseUrl = '/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (body) => {
  const config = {
    headers: { Authorization: loginService.getToken() }
  };
  const response = await axios.post(baseUrl, body, config);
  return response.data;
};

const update = async (id, body) => {
  const config = {
    headers: { Authorization: loginService.getToken() }
  };
  const response = await axios.put(`${baseUrl}/${id}`, body, config);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: loginService.getToken() }
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, create, update, remove };