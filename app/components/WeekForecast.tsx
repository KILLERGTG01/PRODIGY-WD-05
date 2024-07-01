import React, { useEffect, useState } from "react";

interface DayForecast {
  date: string;
  day: {
    condition: {
      icon: string;
      text: string;
    };
    maxtemp_c: number;
    mintemp_c: number;
  };
}

interface ForecastData {
  forecast: {
    forecastday: DayForecast[];
  };
}

const WeekForecast = () => {
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);

  useEffect(() => {
    // Replace with your actual API call
    const fetchWeatherData = async () => {
      const response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=3988e96171874c25b1672407242906&q=Delhi&days=7&aqi=yes&alerts=yes");
      const data = await response.json();
      setForecastData(data);
    };

    fetchWeatherData();
  }, []);

  if (!forecastData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 w-full">
      {forecastData.forecast.forecastday.map((day, index) => (
        <div key={index} className="bg-white/40 p-2 text-center rounded-lg flex flex-col items-center">
          <p>{new Date(day.date).toLocaleString("en-US", { weekday: "short" })}</p>
          <img src={day.day.condition.icon} alt={day.day.condition.text} />
          <div>
            <p>H {day.day.maxtemp_c.toFixed()}°C</p>
            <p>L {day.day.mintemp_c.toFixed()}°C</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeekForecast;
