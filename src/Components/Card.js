import React, { useState } from "react";
import "./Card.css";

const api = {
  key: "399fada1a6e01fb2c2ff139b6fdc5cd9",
  base: "https://api.openweathermap.org/data/2.5/"
}

function Card() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const  search = event => {
      if(event.key === "Enter") {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => 
          setWeather(result));
          setQuery('');
          console.log(weather);
      }
    }

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August",
         "September", "October", "November", "December",];
        let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    return (
      <div className="card">
      <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 30) ? 
      'card warm' : 'card') : 'card'}>
            <main>
              <div className="search">
                <input
                  type = "text"
                  className = "searchbar"
                  placeholder= "search here"
                  onChange={e => setQuery(e.target.value)}
                  value={query}
                  onKeyUp={search}
                  />
              </div>
              {(typeof weather.main!="undefined")?(
                <div>
              <div className="location-box">
                <div className="location"> {weather.name} {weather.sys.country} </div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>+
              <div className="weather-box">
                <div className="temp">
                  {weather.main.temp}°C
                </div>
                <div className="weather"> {weather.weather[0].main}</div>
              </div>
              </div>
              ):('')}
            </main>
        </div>
        </div>
    )
}

export default Card;