import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(0)

  useEffect(() => {
    axios.get(`http://api.apixu.com/v1/current.json?key=a89d0b39b9f249d59ce101343190307&q=${capital}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [capital])

  if(weather === 0) {
    return <div>Weather loading</div>
  }
  return (
    <div>
      <div>Lämpötila: {weather.current.temp_c}C</div>
      <div>Tuuli: {weather.current.wind_kph} suunta {weather.current.wind_dir}</div>
      <img src={weather.current.condition.icon} alt={"condition " + weather.location.name} height="100" />
    </div>
  )
}

export default Weather