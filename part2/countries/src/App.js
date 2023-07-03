import { useState, useEffect } from 'react';
import countryService from './services/countries';
import Countries from './components/Countries';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (query) {
      countryService
      .getAll()
      .then((countries) => {
        setCountries(
          countries.filter(country => {
            const countryName = country.name.common;
            return countryName.toLowerCase().includes(query.toLowerCase());
          })
        )
      });
    }
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  return (
    <div>
      find countries 
      <input type="text" value={query} onChange={handleChange} />
      <Countries countries={countries} />
    </div>
  );
}

export default App;
