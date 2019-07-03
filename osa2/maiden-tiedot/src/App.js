import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

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
    console.log("showcountries")
    let filteredCountries = filterCountries()
    if (filteredCountries.length > 10) {
      return <div>Liian monta tulosta, tarkenna hakua</div>
    }
    else if(filteredCountries.length === 1) {
      const country = filteredCountries.pop()
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


  return (
   <div>
     <h1>Maiden tiedot</h1>
     <p>Etsi maita <input value={filter} onChange={handleChange} /></p>
     {showCountries()}
   </div> 
  )
}

export default App;
