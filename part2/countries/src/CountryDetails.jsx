import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null)

  const apiKey = import.meta.env.VITE_WEATHER_KEY

  useEffect(() => {
    if (!country.capital) return

    const capital = country.capital[0]

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
      )
      .then(response => {
        setWeather(response.data)
      })
  }, [country, apiKey])

  return (
    <div>
      <h1>{country.name.common}</h1>

      <p>
        <strong>Capital:</strong> {country.capital?.[0]}
      </p>

      <p>
        <strong>Area:</strong> {country.area}
      </p>

      <h2>Languages</h2>

      <ul>
        {Object.values(country.languages || {}).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={country.flags.alt || country.name.common}
        width="200"
      />

      {weather && (
        <>
          <h2>Weather in {country.capital[0]}</h2>

          <p>
            <strong>Temperature:</strong> {weather.main.temp} °C
          </p>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />

          <p>
            <strong>Wind:</strong> {weather.wind.speed} m/s
          </p>
        </>
      )}
    </div>
  )
}

export default CountryDetails