import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [weather, setWeather] = useState({});
  const [searchCountry, setSearchCountry] = useState("Bangkok");

  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchWeather = async () => {
    setIsLoading(true);
    setIsCompleted(false);
    try {
      const responseCoordinate = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${searchCountry}&appid=${apiKey}`
      );
      const latitude = responseCoordinate.data[0].lat.toFixed(2);
      const longitude = responseCoordinate.data[0].lon.toFixed(2);

      const responseWeather = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );
      console.log(responseWeather.data);
      setWeather(responseWeather.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setIsCompleted(true);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const convertTemp = (k) => {
    return (k - 273).toFixed();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return isLoading ? (
    <h1>Loading ....</h1>
  ) : (
    isCompleted && (
      <main className="w-screen h-screen flex flex-col justify-center items-center gap-10 bg-slate-900">
        <h1 className="text-white text-3xl font-bold">Weather Application</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-row gap-2 items-center"
        >
          <label htmlFor="searchCountry" />
          <input
            name="searchCountry"
            id="searchCountry"
            type="text"
            placeholder="Type Country"
            className="p-2 outline-none rounded-md w-[300px] text-center"
            onChange={(e) => setSearchCountry(e.target.value)}
          />
          <button type="submit" className="text-white border p-2 rounded-md">
            search
          </button>
        </form>

        <div className="weather-container border w-[400px] h-[500px] rounded-lg text-white bg-slate-600 flex flex-col justify-around items-center">
          <div className="country text-center flex flex-col gap-3 w-full">
            <p className="text-2xl font-bold">{weather.name}</p>
            <p>{weather.sys.country}</p>
          </div>
          <div className="temperature text-center w-full flex flex-col gap-12">
            <div className="flex flex-col">
              Temperature
              <span className="text-3xl font-bold opacity-70">
                {convertTemp(weather.main.temp)}&deg;c
              </span>
            </div>
            <div className=" flex justify-around">
              <div className="flex flex-col">
                High Temp
                <span className="text-3xl font-bold opacity-70">
                  {convertTemp(weather.main.temp_max)}&deg;c
                </span>
              </div>
              <div className="flex flex-col">
                Low Temp
                <span className="text-3xl font-bold opacity-70">
                  {convertTemp(weather.main.temp_min)}&deg;c
                </span>
              </div>
            </div>
          </div>
          <div className="detai flex flex-row w-full justify-around">
            <p>{weather.weather[0].main}</p>
            <p>{weather.main.humidity}</p>
            <p>{weather.wind.speed}</p>
          </div>
        </div>
      </main>
    )
  );
}

export default App;
