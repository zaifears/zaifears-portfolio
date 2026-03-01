"use client";

import { useState, useEffect } from 'react';

export default function Weather() {
  const [weather, setWeather] = useState<{ temperature: number; weathercode: number } | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    async function fetchWeather() {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=23.777176&longitude=90.399452&current_weather=true'
        );
        const data = await response.json();
        setWeather(data.current_weather);
      } catch (error) {
        console.error("Failed to fetch weather", error);
        setWeather(null);
      }
    }
    fetchWeather();
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code === 0) return '☀️';
    if (code >= 1 && code <= 3) return '☁️';
    if (code >= 45 && code <= 48) return '🌫️';
    if (code >= 51 && code <= 67) return '🌧️';
    if (code >= 71 && code <= 77) return '❄️';
    if (code >= 80 && code <= 82) return '🌧️';
    if (code >= 85 && code <= 86) return '❄️';
    if (code >= 95 && code <= 99) return '⛈️';
    return '...';
  };

  if (!isClient || !weather) {
    return (
      <div className="text-center font-mono text-zinc-400 text-sm animate-pulse">
        <span>--°C</span>
        <span className="ml-2">...</span>
        <p className="text-xs">Dhaka, Bangladesh</p>
      </div>
    );
  }

  return (
    <div className="text-center font-mono text-zinc-400 text-sm">
      <span>{weather.temperature.toFixed(0)}°C</span>
      <span className="ml-2">{getWeatherIcon(weather.weathercode)}</span>
      <p className="text-xs">Dhaka, Bangladesh</p>
    </div>
  );
}
