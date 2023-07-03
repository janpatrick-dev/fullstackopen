import { useState, useEffect } from 'react';
import weatherService from '../services/weather';

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const [iconCode, setIconCode] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    weatherService
      .getCountryWeather(country)
      .then((returnedWeather) => {
        setWeather(returnedWeather);
        if (returnedWeather.weather.length > 0) {
          setIconCode(returnedWeather.weather[0].icon);
        }
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  if (error) {
    return (
      <div>
        <h2>Weather in {country.name.common}</h2>
        <p>No weather info found.</p>
      </div>
    )
  }

  if (!weather) {
    return (
      <div>
        <h2>Weather in {country.name.common}</h2>
        <p>Loading weather data...</p>
      </div>
    )
  }

  return ( 
    <div>
      <h2>Weather in {country.name.common}</h2>
      <p>temperature {weather.main.temp} Celsius</p>
      <img src={weatherService.imageUrl(iconCode)} />
      <p>wind {weather.wind.speed}m/s</p>
    </div>
  );
}
 
export default Weather;