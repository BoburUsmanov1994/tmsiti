import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Tashkent&units=metric&appid=3a135ab8de8aad2dfa47deea1bf53cca`
      );
      setWeatherData(response.data);
      console.log(response.data); //You can see all the weather data in console log
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div>
      {weatherData ? (
        <div className="flex items-center justify-center flex-col p-3  ">
          <h2 className="text-sm">{weatherData.name}</h2>
          <div>
            <Image
              src={"/images/sun-weather.png"}
              alt="sun"
              width={40}
              height={40}
            />

            <p>{Math.round(weatherData.main.temp)}°C</p>
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
