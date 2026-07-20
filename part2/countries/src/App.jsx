import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './CountryList'
import CountryDetails from './CountryDetails'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
const [selectedCountry, setSelectedCountry] = useState(null)
const showCountry = (country) => {
  setSelectedCountry(country)
}
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filteredCountries = countries.filter(country =>
    country.name.common
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <div>
      <div>
        find countries{' '}
        <input
          value={search}
          onChange={(e) => {
  setSearch(e.target.value)
  setSelectedCountry(null)
}}
        />
      </div>

     {selectedCountry ? (
  <CountryDetails country={selectedCountry} />
) : filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries[0]} />
      ) : (
        <CountryList
  countries={filteredCountries}
  showCountry={showCountry}
/>
      )}
    </div>
  )
}

export default App