import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'






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
      <Countries 
        filteredCountries={filterCountries()} 
        handleButton={handleButton} />
    </div> 
  )
}

export default App;
