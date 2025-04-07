'use client';

import { useState, useEffect } from 'react';
import SearchBarComponent from './SearchbarComponent';
import CurrentWeatherComponent from './CurrentWeatherComponent';
import ForecastComponent from './ForcastComponent';
import { WeatherData, LocationData } from '@/interfaces/interfaces';

const WeatherDashComponent = () => {
  const myApiKey = "5a2c5a57257539546655f5b46c056268";

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [currentLocation, setCurrentLocation] = useState<LocationData>({
    city: "Stockton",
    country: "US",
    lat: 37.9577,
    lon: -121.2908
  });
  
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        () => {
          fetchWeatherByCoords(currentLocation.lat, currentLocation.lon);
        }
      );
    } else {
      fetchWeatherByCoords(currentLocation.lat, currentLocation.lon);
    }
  }, []);

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    

    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${myApiKey}`
    );
    const geoData = await geoResponse.json();

    if (geoData && geoData.length > 0) {
      setCurrentLocation({
        city: geoData[0].name,
        country: geoData[0].country,
        lat,
        lon
      });
    }

    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${myApiKey}`
    );
    const data = await weatherResponse.json();

    setWeatherData(data);
    saveRecentSearch(data.city.name);
   
  };

  const fetchWeatherByCity = async (city: string) => {


    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city},US&limit=1&appid=${myApiKey}`
    );
    const geoData = await geoResponse.json();

    if (geoData && geoData.length > 0) {
      const location = geoData[0];
      setCurrentLocation({
        city: location.name,
        country: location.country,
        lat: location.lat,
        lon: location.lon
      });
      fetchWeatherByCoords(location.lat, location.lon);
    } else {
      setError(`City "${city}" not found.`);
    }
  };

  const saveRecentSearch = (city: string) => {
    let recentSearches = getRecentSearches();
  
    recentSearches = recentSearches.filter(item => item !== city);
  
    recentSearches.unshift(city);
  
    if (recentSearches.length > 5) {
      recentSearches = recentSearches.slice(0, 5);
    }
  
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  };

  const getRecentSearches = (): string[] => {
    const searches = typeof window !== 'undefined' ? localStorage.getItem('recentSearches') : null;
    return searches ? JSON.parse(searches) : [];
  };

  const saveFavoriteCity = (city: string) => {
    const favorites = getFavoriteCities();
    if (!favorites.includes(city)) {
      favorites.push(city);
      localStorage.setItem('favoriteCities', JSON.stringify(favorites));
    }
  };


  const getFavoriteCities = (): string[] => {
    const favorites = typeof window !== 'undefined' ? localStorage.getItem('favoriteCities') : null;
  return favorites ? JSON.parse(favorites) : [];
  };

  return (
    <div>
      <section className="flex justify-end mb-[50px]">
        <SearchBarComponent 
         onSearch={fetchWeatherByCity} 
         recentSearches={getRecentSearches()} 
         onSelectRecentSearch={fetchWeatherByCity} 
        />
      </section>

      <main>
        {error ? (
          <div className="text-center py-12 text-red-500">
            <p className="text-xl">{error}</p>
          </div>
        ) : (
          <>
            {weatherData && (
              <>
                <CurrentWeatherComponent
                  weatherData={weatherData}
                  location={currentLocation}
                  onAddFavorite={() => saveFavoriteCity(currentLocation.city)}
                />

                <ForecastComponent weatherData={weatherData} />

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">

                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default WeatherDashComponent;