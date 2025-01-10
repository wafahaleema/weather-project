import React, { useEffect, useState } from 'react'
import "./App.css"
import Button from './../node_modules/bootstrap/js/src/button';
import axios from 'axios'; // Import axios

const App = () => {
  const apiKey = "f56f24967aaf51182d1d4df628297c6d"
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})

  const getWeatherDetails = (cityName) => {
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiURL)
      .then((res) => {
        console.log("response", res.data)
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      })
  }

  const handleChangeInput = (e) => {
    // console.log("value", e.target.value);
    setInputCity(e.target.value)
  }

  const handleSearch = () => {
    getWeatherDetails(inputCity)
  }


  // useEffect(() => {
  //   getWeatherDetails("Karachi")
  // }, []);



  return (
    <div className="col-md-12">
      <div className="weatherbg">
        <h1 className='heading'>Weather App</h1>

        <div className="container">
          <input type="text" className="form-control"
            value={inputCity}
            onChange={handleChangeInput} />
          <button className="btn btn-primary" type="button"
            onClick={handleSearch}
          >Search</button>
        </div>
      </div>


      {Object.keys(data).length > 0 &&
        <div className="col-md-12 text-center mt-5">

          <div className="shadow rounded weatherResultBox">
            <img className='weatherIcon'
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsnj2To47F2Fb4jrhufRYC-R3tM1uvPYGPFNWKKNcsWe06j7O8" />

            <h5 className='weatherCity'>
              {data?.name}
            </h5>
            <h6 className='weatherTemp'>{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
          </div>
        </div>
      }
    </div>
  )
}

export default App
