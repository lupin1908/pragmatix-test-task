import React, { useState, useEffect } from "react";
import { api, City } from "./services/api";
import "./App.css";

function App() {
  const [cities, setCities] = useState<City[]>([]);
  const [city, setCity] = useState<string | undefined>("");
  const [newCity, setNewCity] = useState("");
  const [rawWeather, setRawWeather] = useState<any>(null);
  const [averageWeather, setAverageWeather] = useState<any>(null);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const data = await api.getCities();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const onClickFetchData = async (cityName: string) => {
    try {
      const [raw, average] = await Promise.all([
        api.getRawWeather(cityName, fromDate, toDate),
        api.getAverageWeather(cityName, fromDate, toDate),
      ]);
      setRawWeather(raw);
      setAverageWeather(average);
      setCity(cityName);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleDateChange = (e, func) => {
    const value = e.target.value; // format: "2025-01-26T20:06"
    if (value) {
      const formatted = value.replace("T", " "); // replace T with a space
      func(formatted);
    } else {
      func("");
    }
  };

  const handleAddCity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCity.trim()) return;

    try {
      await api.addCity({ name: newCity });
      setNewCity("");
      fetchCities();
    } catch (error) {
      console.error("Error adding city:", error);
    }
  };

  const handleDeleteCity = async (id: string) => {
    try {
      await api.deleteCity(id);
      fetchCities();
    } catch (error) {
      console.error("Error deleting city:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Dashboard</h1>
      </header>

      <main className="App-main">
        <section className="cities-section">
          <h2>Manage Cities</h2>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label htmlFor="from">From</label>
            <input
              id="from"
              type="datetime-local"
              onChange={(event) => handleDateChange(event, setFromDate)}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label htmlFor="to">To</label>
            <input
              id="to"
              type="datetime-local"
              onChange={(event) => handleDateChange(event, setToDate)}
            />
          </div>

          <form onSubmit={handleAddCity} className="city-form">
            <input
              type="text"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              placeholder="Enter city name"
            />
            <button type="submit">Add City</button>
          </form>

          <ul className="city-list">
            {cities.map((city) => (
              <li key={city.id} className="city-item">
                <div
                  className="city-name"
                  onClick={() => onClickFetchData(city.name)}
                >
                  {city.name}
                </div>

                <button onClick={() => handleDeleteCity(city.id!)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </section>

        {city && fromDate && toDate && (
          <section className="weather-section">
            <h2>Weather Data</h2>
            <div className="weather-data">
              <div className="weather-card">
                <h3>Average Weather</h3>
                <pre>{JSON.stringify(averageWeather, null, 2)}</pre>
              </div>
              <div className="weather-card">
                <h3>Raw Weather Data</h3>
                <pre>{JSON.stringify(rawWeather, null, 2)}</pre>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
