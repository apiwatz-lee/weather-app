import React from "react";

const Weather = ({
  name,
  country,
  tempAvg,
  tempMax,
  tempMin,
  weather,
  humidity,
  wind,
}) => {
  return (
    <div className="weather-container border w-[400px] h-[500px] rounded-lg text-white bg-slate-600 flex flex-col justify-around items-center">
      <div className="country text-center flex flex-col gap-3 w-full">
        <p className="text-2xl font-bold">{name}</p>
        <p>{country}</p>
      </div>
      <div className="temperature text-center w-full flex flex-col gap-12">
        <div className="font-bold flex flex-col gap-1">
          Temperature
          <span className="text-3xl font-bold opacity-50">{tempAvg}&deg;c</span>
        </div>
        <div className=" flex justify-around">
          <div className="font-bold flex flex-col gap-1">
            High Temp
            <span className="text-3xl font-bold opacity-50">
              {tempMax}&deg;c
            </span>
          </div>
          <div className="font-bold flex flex-col gap-1">
            Low Temp
            <span className="text-3xl font-bold opacity-50">
              {tempMin}&deg;c
            </span>
          </div>
        </div>
      </div>
      <div className="detai flex flex-row w-full justify-around">
        <p className="font-bold flex flex-col items-center gap-1">
          Weather <span className="opacity-50 text-xl"> {weather}</span>
        </p>
        <p className="font-bold flex flex-col items-center gap-1">
          Humidity <span className="opacity-50 text-xl"> {humidity}</span>
        </p>
        <p className="font-bold flex flex-col items-center gap-1">
          Wind Speed <span className="opacity-50 text-xl"> {wind}</span>
        </p>
      </div>
    </div>
  );
};

export default Weather;
