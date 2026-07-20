const CountryList = ({ countries, showCountry }) => {
  return (
    <div>
      {countries.map(country => (
        <p key={country.cca3}>
          {country.name.common}{' '}
          <button onClick={() => showCountry(country)}>
            show
          </button>
        </p>
      ))}
    </div>
  )
}

export default CountryList