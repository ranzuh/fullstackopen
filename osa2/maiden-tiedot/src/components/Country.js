import React from 'react'

const Country = ({ country }) => {
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

export default Country