import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {

  const [countries, setCountries] = useState(null);
  const [matchedCountries, setMatchedCountries] = useState(null);
  const [countryName, setCountryName] = useState(null);
  
  const [countrySearch, setCountrySearch] = useState('');

  const [country, setCountry] = useState(null);

  const [weatherData, setWeatherData] = useState(null);

  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api"
  const weatherUrl = (latlng) => `https://api.openweathermap.org/data/3.0/onecall?lat=${latlng[0]}&lon=${latlng[1]}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`

  useEffect(() => {
    axios.get(`${baseUrl}/all`)
      .then(res => res.data)
      .then(countryData => {
        const countryCommonNames = countryData.map(country => country.name.common)
        setCountries(countryCommonNames)
      })
  }, [])

  useEffect(() => {
    matchedCountries && matchedCountries.length === 1 ? setCountryName(matchedCountries[0]) : setCountryName(null)
  }, [matchedCountries])

  useEffect(() => {
    if (countryName){
      axios.get(`${baseUrl}/name/${countryName}`)
      .then(res => res.data)
      .then(countryData => {
        setCountry(countryData)
        console.log(countryData)

        axios.get(weatherUrl(countryData.latlng))
          .then(res => res.data)
          .then(weatherData => setWeatherData(weatherData))
      })
    }
  }, [countryName])

  const matchesFilter = (term, filter) => term.substring(0, filter.trim().length).toLowerCase().trim() == filter.toLowerCase().trim()

  const handleCountrySearch = (event) => {
    const filter = event.target.value

    setCountrySearch(filter)
    if (countries) setMatchedCountries(countries.filter(country => matchesFilter(country, filter)))
  }

  const showCountry = (country) => {
    setMatchedCountries(matchedCountries.filter(countryName => countryName === country))
    setCountrySearch(country)
  }

  return (
    <>
      <h1>Countries</h1>
      <p>find countries <input type="text" value={countrySearch} onChange={handleCountrySearch}/></p>
      <div>
        {
          matchedCountries && countrySearch !== '' ? matchedCountries.length > 10 ?
          <p>Too many matches, specify further</p>
          : matchedCountries.length === 1 && country ? (
            <div>
              <h1>{country.name.common}</h1>
              <p>Capital: {country.capital[0]}</p>
              <p>Area: {country.area} sq. km</p>
              <h2>Languages</h2>
              <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
              </ul>
              <img width={300} src={country.flags.svg} alt={country.flags.alt} />
              <div>
                <h2>Weather in {country.capital}</h2>
                {
                  weatherData ?
                  <div>
                    <p>Temperature: {Math.round(100*(weatherData.current.temp - 273.15))/100} <sup>o</sup> C</p>
                    <img src={`https://openweathermap.org/img/w/${weatherData.current.weather[0].icon}.png`} alt={weatherData.current.weather[0].description} />
                    <p>Wind: {weatherData.current.wind_speed} m/s</p>
                  </div>
                  : null
                }
              </div>
            </div>
          ) 
          : matchedCountries.map((country, index) => <p key={index}>{country} <button key={country} onClick={() => showCountry(country)}>show info</button></p>)
          : null
        }
      </div>
    </>
  )
}

export default App
