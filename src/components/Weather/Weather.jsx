// src/components/Weather/Weather.js
import React, { useState, useEffect } from "react";
import getWeatherIcon from "../../utils/getWeatherIcon";
import api from "../../api/api";
import "./Weather.scss";

const Weather = ({ coords }) => {
    const [temperature, setTemperature] = React.useState("xx.x");
    const [city, setCity] = React.useState("Bruxelles");
    const [humidity, setHumidity] = React.useState(null);
    const [uvIndex, setUvIndex] = React.useState(null);
    const [windSpeed, setWindSpeed] = React.useState(null);
    const [date, setDate] = React.useState(new Date());
    const [weatherData, setWeatherData] = React.useState(null);

    const fetchWeatherWithCoords = async (lat, lon) => {
        try {
            const weatherData = await api.fetchWeatherWithCoords(lat, lon);
            setWeatherData(weatherData);
            setTemperature(weatherData.main.temp);
            setCity(weatherData.name);
            setHumidity(weatherData.main.humidity);
            setWindSpeed(weatherData.wind.speed);

            const uvData = await api.fetchUVIndex(lat, lon);
            setUvIndex(uvData.value);
        } catch (error) {
            alert("Un problème est intervenu, merci de revenir plus tard.");
        }
    };

    useEffect(() => {
        if (coords) {
            fetchWeatherWithCoords(coords.lat, coords.lon);
        }
    }, [coords]);

    const interpretUVIndex = (uvIndex) => {
        if (uvIndex < 3) {
            return "Faible";
        } else if (uvIndex < 6) {
            return "Modéré";
        } else if (uvIndex < 8) {
            return "Élevé";
        } else if (uvIndex < 11) {
            return "Très élevé";
        } else {
            return "Extrême";
        }
    };

    return (
        <section className="section">
            <div className="container">
                <h1 className="title bold" id="ville">
                    {city}
                </h1>
                <h2 className="title title--niveau3">
                    {date.toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </h2>
            </div>
            <div className="container--second">
                <div>
                    <h3 className="title title--niveau3 uppercase">
                        {date.toLocaleDateString("fr-FR", { weekday: "long" })}
                    </h3>
                    <p className="bold temperature" id="temperature_label">
                        {Math.round(temperature)}°C
                    </p>
                </div>
                {weatherData && (
                    <img
                        src={getWeatherIcon(weatherData.weather[0].description)}
                        alt={weatherData.weather[0].description}
                    />
                )}
            </div>

            <ul className="additional__info">
                <li className="additional__el">
                    <img
                        className="additional__img"
                        src="src/assets/images/humidite_1.svg"
                        alt="humidité"
                    />
                    <p>Humidité</p>
                    <div>{humidity}%</div>
                </li>
                <li className="additional__el">
                    <img
                        className="additional__img"
                        src="src/assets/images/uv.png"
                        alt="U.V"
                    />
                    <p>Indice UV</p>
                    <div>
                        {uvIndex} {interpretUVIndex(uvIndex)}
                    </div>
                </li>
                <li className="additional__el">
                    <img
                        className="additional__img"
                        src="src/assets/images/vent.png"
                        alt="vent"
                    />
                    <p>Vent</p>
                    <div>{(windSpeed * 3.6).toFixed(1)} km/h</div>
                </li>
            </ul>
        </section>
    );
};

export default Weather;
