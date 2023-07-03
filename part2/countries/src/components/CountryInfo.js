const CountryInfo = ({ country }) => {
  return ( 
    <div>
      <h1>{country.name.common}</h1>
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
  );
}
 
export default CountryInfo;