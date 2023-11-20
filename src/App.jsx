import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import Form from "./components/Form";
import Weather from "./components/Weather";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [weather, setWeather] = useState({});
  const [searchCountry, setSearchCountry] = useState("Hat Yai");

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
      console.log("coordinate", responseCoordinate);
      const responseWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
      console.log(responseWeather);
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
    <ChakraProvider>
      <div className="flex justify-center items-center h-screen">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    </ChakraProvider>
  ) : (
    isCompleted && (
      <main className="w-screen h-screen flex flex-col justify-center items-center gap-10 bg-gradient-to-bl from-gray-700 via-gray-900 to-black">
        <h1 className="text-white text-3xl font-bold">
          Thailand Weather Application
        </h1>
        <Form
          handleSubmit={handleSubmit}
          onChange={(e) => setSearchCountry(e.target.value)}
        />
        <Weather
          name={weather.name}
          country={weather.sys.country}
          tempAvg={convertTemp(weather.main.temp)}
          tempMax={convertTemp(weather.main.temp_max)}
          tempMin={convertTemp(weather.main.temp_min)}
          weather={weather.weather[0].main}
          humidity={weather.main.humidity}
          wind={weather.wind.speed}
        />
      </main>
    )
  );
}

export default App;
