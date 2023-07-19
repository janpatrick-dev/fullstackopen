import axios from 'axios';

const baseUrl = '/api/login';

let token = '';

const setToken = (userToken) => {
  token = `Bearer ${userToken}`;
};

const getToken = () => {
  return token;
};

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login, setToken, getToken };