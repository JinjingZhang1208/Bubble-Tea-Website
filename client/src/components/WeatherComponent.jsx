import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeatherData = async () => {
    const options = {
      method: 'GET',
      url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
      params: {
        aggregateHours: '24',
        location: 'Washington,DC,USA',
        contentType: 'json',
        unitGroup: 'us',
        shortColumnNames: '0'
      },
      headers: {
        'X-RapidAPI-Key': '8ed95307c6mshbb4da8df9fcbb3dp1ae007jsn2732772af106',
        'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading weather data...</p>
      ) : (
        <div>
          <h2>Weather Information</h2>
          {weatherData && (
            <div>
              <p>
                Location: {weatherData.location.name}, {weatherData.location.administrativeArea},{' '}
                {weatherData.location.country}
              </p>
              <p>Temperature: {weatherData.currentConditions.temp}°F</p>
              <p>Conditions: {weatherData.currentConditions.conditions}</p>
              <p>Wind Speed: {weatherData.currentConditions.wspd} mph</p>
              <p>Humidity: {weatherData.currentConditions.humidity}%</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
