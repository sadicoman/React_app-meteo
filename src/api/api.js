// src/api/api.js
import axios from "axios";

const api = {
    fetchWeather: async (city) => {
        try {
            const response = await axios.get(
                "https://api.openweathermap.org/data/2.5/weather",
                {
                    params: {
                        q: city,
                        appid: "dc8c9152e8adaad0ec8bf635818c0d42",
                        units: "metric",
                    },
                },
            );
            const { data } = response;
            const { lat, lon } = data.coord;
            return { ...data, lat, lon };  // maintenant il retourne aussi les coordonnées lat et lon
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    fetchWeatherWithCoords: async (lat, lon) => {
        try {
            const response = await axios.get(
                "https://api.openweathermap.org/data/2.5/weather",
                {
                    params: {
                        lat: lat,
                        lon: lon,
                        appid: "dc8c9152e8adaad0ec8bf635818c0d42",
                        units: "metric",
                    },
                },
            );
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    fetchUVIndex: async (lat, lon) => {
        try {
            const response = await axios.get(
                "https://api.openweathermap.org/data/2.5/uvi",
                {
                    params: {
                        lat: lat,
                        lon: lon,
                        appid: "dc8c9152e8adaad0ec8bf635818c0d42",
                    },
                },
            );
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    fetchForecast: async (lat, lon) => {
        try {
            const response = await axios.get(
                "https://api.openweathermap.org/data/2.5/onecall",
                {
                    params: {
                        lat: lat,
                        lon: lon,
                        exclude: "current,minutely,hourly,alerts",
                        appid: "dc8c9152e8adaad0ec8bf635818c0d42",
                        units: "metric",
                    },
                },
            );
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

export default api;
