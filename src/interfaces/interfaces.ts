export interface LocationData {
  city: string;
  country: string;
  lat: number;
  lon: number;
}

export interface WeatherItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  dt_txt: string;
}

export interface WeatherData {
  list: WeatherItem[];
  city: {
    name: string;
    country: string;
    coord: { lat: number; lon: number };
  };
}