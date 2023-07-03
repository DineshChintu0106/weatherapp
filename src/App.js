import "./App.css";
import { useState } from "react";

const api = {
  key: "c5be7e2bf5a8f54569e5f1700954fbd8",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false)
  const [style, setStyle] = useState('App-header')

  /*
    Search button is pressed. Make a fetch call to the Open Weather Map API.
  */
  const searchPressed = () => {
    setWeather('')
    setLoading(true)
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setLoading(false)
        if (result.weather[0].main.toLowerCase() === "thunderstorm") {
          setStyle("thunder")
        } else if (result.weather[0].main.toLowerCase() === "clouds") {
          setStyle('clouds')
        }
        else if (result.weather[0].main.toLowerCase() === "rain") {
          setStyle('rainy')
        } else {
          setStyle('App-header')
        }
        setWeather(result);
      }).catch(err => {
        console.log(err)
      })
  };

  return (
    <div className={style}>
      <div className="card-container">
        {/* HEADER  */}
        <h1>Weather</h1>

        {/* Search Box - Input + Button  */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
          <input
            className="search-conatiner"
            type="text"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>

        {loading && <h1>Loading...</h1>}

        {/* If weather is not undefined display results from API */}
        {typeof weather.main !== "undefined" ? (
          <div>
            {/* Location  */}
            <p>{weather.name}</p>

            {/* Temperature Celsius  */}
            <p>{weather.main.temp}°C</p>

            {/* Condition (Sunny ) */}
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
          </div>
        ) : (
          <p>No cities found</p>
        )}
      </div>

    </div>

  );
}

export default App;