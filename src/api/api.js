// src/api/api.js
import axios from "axios";

const api = {
    fetchWeather: async (city) => {
        // eslint-disable-next-line no-useless-catch
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
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    fetchWeatherWithCoords: async (lat, lon) => {
        // eslint-disable-next-line no-useless-catch
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
            throw error;
        }
    },
};

export default api;
