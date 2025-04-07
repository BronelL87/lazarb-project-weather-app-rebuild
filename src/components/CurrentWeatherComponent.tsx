'use client';

import { useState, useEffect } from 'react';
import { WeatherData, LocationData } from '@/interfaces/interfaces';

interface CurrentWeatherProps {
  weatherData: WeatherData;
  location: LocationData;
  onAddFavorite: () => void;
}

const CurrentWeatherComponent = ({ 
  weatherData, 
  location,
  onAddFavorite 
}: CurrentWeatherProps) => {
  // const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      // setCurrentTime(now.toLocaleTimeString());
      setCurrentDate(now.toLocaleDateString());
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const kelvinToFahrenheit = (kelvin: number): number => ((kelvin - 273.15) * 9) / 5 + 32;

  const currentWeather = weatherData.list[0];
  const weatherIcon = currentWeather.weather[0].icon;
  const weatherDescription = currentWeather.weather[0].description;
  const currentTemp = kelvinToFahrenheit(currentWeather.main.temp).toFixed(0);
  const highTemp = kelvinToFahrenheit(currentWeather.main.temp_max).toFixed(0);
  const lowTemp = kelvinToFahrenheit(currentWeather.main.temp_min).toFixed(0);
  

  return (
    <div className='flex justify-center'>
      <div className="bg-[#010536e0] rounded-[50px] w-[1000px] h-[500px] shadow-md p-6 mb-6">
        <div className="flex justify-center items-center mb-4">
          <button 
            onClick={onAddFavorite}
            className="p-5 rounded-full hover:cursor-pointer"
            aria-label="Add to favorites"
          >
            <img src='/unfilledStar.png' alt="Unfilled Star" />
          </button>
          <h1 className="text-[60px] font-bold">{`${location.city}, ${location.country}`}</h1>
        </div>

        <div>
            <div className='flex justify-center'>
                <img 
                src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} 
                alt={weatherDescription} 
                className="w-[150px] h-[150px]"
                />
                <p className="text-[100px] font-bold text-center">{`${currentTemp}°F`}</p>
            </div>
          

          <div className="flex flex-wrap text-sm text-[50px] justify-center">
            <p>{currentDate}</p>
          </div>
          <p className="text-[50px] text-center mb-2">{weatherDescription}</p>

          <div className='flex justify-center'>
            <div className="grid grid-cols-2 gap-[238px] mb-6">
              <p className="text-[36px]">{`High: ${highTemp}°F`}</p>
              <p className="text-[36px]">{`Low: ${lowTemp}°F`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherComponent;