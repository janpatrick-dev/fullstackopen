import axios from 'axios'
import loginService from './login';

const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data;
}

const create = async (body) => {
  const config = {
    headers: { Authorization: loginService.getToken() }
  };
  const response = await axios.post(baseUrl, body, config);
  return response.data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create }