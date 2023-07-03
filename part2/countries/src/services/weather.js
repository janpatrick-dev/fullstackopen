import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const getCountryWeather = (country) => {
  const request = axios.get(requestUrl(country, 'metric'));
  return request.then(response => response.data);
}

const requestUrl = (country, units) => {
  return baseUrl 
    + '?q=' + country.capital
    + '&appid=' + process.env.REACT_APP_OPENWEATHER_API_KEY
    + '&units=' + units;
}

const imageUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export default { getCountryWeather, imageUrl };