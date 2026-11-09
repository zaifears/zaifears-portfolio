"use client";

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faCloud,
  faSmog,
  faCloudRain,
  faSnowflake,
  faCloudBolt,
  faTemperatureHalf,
} from '@fortawesome/free-solid-svg-icons';

const chip = 'inline-flex items-center gap-2 rounded-full border border-rule bg-paper-2 px-4 py-2 text-sm text-ink-2 tabular-nums';

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
    if (code === 0) return faSun;
    if (code >= 1 && code <= 3) return faCloud;
    if (code >= 45 && code <= 48) return faSmog;
    if (code >= 51 && code <= 67) return faCloudRain;
    if (code >= 71 && code <= 77) return faSnowflake;
    if (code >= 80 && code <= 82) return faCloudRain;
    if (code >= 85 && code <= 86) return faSnowflake;
    if (code >= 95 && code <= 99) return faCloudBolt;
    return faTemperatureHalf;
  };

  if (!isClient || !weather) {
    return (
      <div className={`${chip} text-muted`}>
        <span>--°C</span>
        <span>Dhaka, Bangladesh</span>
      </div>
    );
  }

  return (
    <div className={chip}>
      <FontAwesomeIcon icon={getWeatherIcon(weather.weathercode)} className="w-4 h-4 text-accent-text" aria-hidden="true" />
      <span>{weather.temperature.toFixed(0)}°C</span>
      <span>Dhaka, Bangladesh</span>
    </div>
  );
}
