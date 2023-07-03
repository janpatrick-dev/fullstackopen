import { useState, useEffect } from 'react';
import Country from "./Country";

const Countries = ({ countries }) => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    setShows(new Array(countries.length).fill(false))
  }, [countries]);

  const handleShowClick = (e, index) => {
    setShows(shows.map((show, i) => index !== i ? show : !show));
  }

  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countries.length === 1) {
    const country = countries[0];
    return (
      <Country country={country} />
    )
  }

  return (
    <div>
      {countries.map((country, index) => (
        <div>
          {country.name.common}
          <button onClick={(e) => handleShowClick(e, index)}>
            {shows[index] ? 'hide' : 'show'}
          </button>
          <Country country={country} show={shows[index]} />
        </div>
      ))}
    </div>
  )
}

export default Countries;