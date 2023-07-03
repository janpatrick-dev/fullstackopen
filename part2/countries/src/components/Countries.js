const Countries = ({ countries }) => {

  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countries.length === 1) {
    const country = countries[0];
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>

        <h3>languages:</h3>
        <ul>
          {Object.keys(country.languages).map((key, index) => {
            return <li key={index}>{country.languages[key]}</li>
          })}
        </ul>
        <img src={country.flags.png} />
      </div>
    )
  }

  return (
    <div>
      {countries.map((country) => {
        <div>{country.name.common}</div>
      })}
    </div>
  )
}

export default Countries;