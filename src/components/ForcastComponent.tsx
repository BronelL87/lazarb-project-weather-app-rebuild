'use client';

import { WeatherData } from '@/interfaces/interfaces';

interface ForecastComponentProps {
  weatherData: WeatherData;
}

const ForecastComponent = ({ weatherData }: ForecastComponentProps) => {
  const kelvinToFahrenheit = (kelvin: number): number => ((kelvin - 273.15) * 9) / 5 + 32;

  const dailyForecasts = weatherData.list.filter((item, index) => index % 8 == 0);

  return (
    <div>
      <h2 className="bg-[#010536e0] w-[300px] h-[67px] rounded-[50px] text-xl font-semibold mb-4 text-[36px] text-center">Today</h2>
      
      <div className="flex gap-[88px]">
      {dailyForecasts.slice(0, 5).map((forecast, index) => {
          const date = new Date(forecast.dt * 1000);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
          const highTemp = kelvinToFahrenheit(forecast.main.temp_max).toFixed(0);
          const lowTemp = kelvinToFahrenheit(forecast.main.temp_min).toFixed(0);
          const dailyTemp = kelvinToFahrenheit(forecast.main.temp).toFixed(0);
          const weatherIcon = forecast.weather[0].icon;
          const weatherDescription = forecast.weather[0].description;

          return (
            <div key={index} className="bg-[#010536e0] w-[300px] h-[250px] rounded-[50px] shadow-lg p-4">
              <p className="text-[36px] text-center">{dayName}</p>
              <div className='flex justify-center'>
                              <img 
                src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} 
                alt={weatherDescription} 
                className="w-[70px] h-[70px]"
              />
             <p className='text-[40px]'>{`${dailyTemp}°F`}</p>
              </div>

              <div className="grid grid-cols-1">  
               
                <p className='text-[36px] text-center'>{`High: ${highTemp}°F`}</p>
                <p className='text-[36px] text-center'>{`Low: ${lowTemp}°F`}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastComponent;