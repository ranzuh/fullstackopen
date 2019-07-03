import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")
  const [weather, setWeather] = useState(0)

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filterCountries = () => {
    return (
      countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    )
  }

  const showCountries = () => {
    let filteredCountries = filterCountries()
    if (filteredCountries.length > 10) {
      return <div>Liian monta tulosta, tarkenna hakua</div>
    }
    else if(filteredCountries.length === 1) {
      const country = filteredCountries.pop()
      if(weather === 0) {
        getWeather(country.capital)
      }
      else if (country.capital !== weather.location.name) {
        getWeather(country.capital)
      }
      
      return (
        <div>
          <h2>{country.name}</h2>
          <div>Pääkaupunki: {country.capital}</div>
          <div>Asukasluku: {country.population}</div>
          <h3>Kielet</h3>
          <div>
            {country.languages.map(lang => <div key={lang.name}>{lang.name}</div>)}
          </div>
          <h3>Lippu</h3>
          <img src={country.flag} alt={"flag of " + country.name} height="100" />
          <h3>Sää {country.capital}</h3>
          {showWeather()}

        </div>
      )
    }

    return filterCountries().map(country => {
      return (
        <div key={country.name}>
          {country.name + " "}
          <button onClick={handleButton(country)}>Näytä</button>
        </div>
      )
    })

  }

  const handleButton = (country) => {
    return () => {
      setFilter(country.name)
    }
  }
  

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  const getWeather = (capital) => {
    axios.get(`http://api.apixu.com/v1/current.json?key=a89d0b39b9f249d59ce101343190307&q=${capital}`)
      .then(response => {
        setWeather(response.data)
      })
  }

  const showWeather = () => {
    if(weather === 0) {
      return <div>no weather yet</div>
    }
    return (
      <div>
        <div>Lämpötila: {weather.current.temp_c}</div>
        <div>Tuuli: {weather.current.wind_kph} suunta {weather.current.wind_dir}</div>
        <img src={weather.current.condition.icon} alt={"condition " + weather.location.name} height="100" />
      </div>
    )
  }


  return (
   <div>
     <h1>Maiden tiedot</h1>
     <p>Etsi maita <input value={filter} onChange={handleChange} /></p>
     {showCountries()}
   </div> 
  )
}

export default App;
