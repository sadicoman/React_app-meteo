// src/components/Weather/Weather.js
import React, { useState, useEffect } from "react";
import api from "../../api/api";
import "./Weather.scss";

const Weather = () => {
    const [temperature, setTemperature] = useState("xx.x");
    const [city, setCity] = useState("Paris");
    const [cityInput, setCityInput] = useState("");

    const fetchWeatherWithCoords = async (lat, lon) => {
        try {
            const data = await api.fetchWeatherWithCoords(lat, lon);
            setTemperature(data.main.temp);
            setCity(data.name);
        } catch (error) {
            alert("Un problème est intervenu, merci de revenir plus tard.");
        }
    };

    const handleCityChange = async () => {
        try {
            const data = await api.fetchWeather(cityInput);
            setTemperature(data.main.temp);
            setCity(data.name);
        } catch (error) {
            alert("Un problème est intervenu, merci de revenir plus tard.");
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                fetchWeatherWithCoords(
                    position.coords.latitude,
                    position.coords.longitude,
                );
            });
        } else {
            alert("La géolocalisation n'est pas prise en charge par ce navigateur.");
        }
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="text-center mt-5">Météo</h1>
                    <div className="text-center">
                        <span id="ville">{city}</span>
                        <div id="temperature">
                            <span id="temperature_label">{temperature}</span> °C
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <input
                        type="text"
                        value={cityInput}
                        onChange={(e) => setCityInput(e.target.value)}
                        placeholder="Entrez une ville"
                    />
                    <button onClick={handleCityChange}>Changer de ville</button>
                </div>
            </div>
        </div>
    );
};

export default Weather;
