import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_KEY = 'd0b94e1935cba0d3040833b1250572e8';
const WEATHER_KEY = 'weather_cache';

export interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  city: string;
  cachedAt: string;
}

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=az`
  );

  const data = res.data;

  const weather: WeatherData = {
    temp: data.main.temp,
    description: data.weather[0].description,
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    city: data.name,
    cachedAt: new Date().toLocaleString(),
  };

  await AsyncStorage.setItem(WEATHER_KEY, JSON.stringify(weather));

  return weather;
};

export const getCachedWeather = async (): Promise<WeatherData | null> => {
  const cached = await AsyncStorage.getItem(WEATHER_KEY);
  return cached ? JSON.parse(cached) : null;
};
