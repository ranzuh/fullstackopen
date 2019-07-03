import React from 'react'
import Weather from './Weather'
import Country from './Country'

const Countries = ({ filteredCountries, handleButton }) => {
  if (filteredCountries.length > 10) {
    return <div>Liian monta tulosta, tarkenna hakua</div>
  }

  else if(filteredCountries.length === 1) {
    const country = filteredCountries.pop()

    return (
      <div>
        <Country country={country} />
        <h3>Sää {country.capital}</h3>
        <Weather capital={country.capital} />
      </div>
    )
  }

  return filteredCountries.map(country => {
    return (
      <div key={country.name}>
        {country.name + " "}
        <button onClick={handleButton(country)}>Näytä</button>
      </div>
    )
  })
}

export default Countries