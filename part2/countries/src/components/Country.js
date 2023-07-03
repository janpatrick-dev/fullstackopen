import CountryInfo from "./CountryInfo";
import Weather from "./Weather";

const Country = ({ country, show=true }) => {
  if (!show) {
    return null;
  }

  return ( 
    <div>
      <CountryInfo country={country} />
      <Weather country={country} />
    </div>
  );
}
 
export default Country;