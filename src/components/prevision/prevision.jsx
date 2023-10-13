// src/components/prevision/prevision.jsx
import React, { useState, useEffect } from "react";
import "./prevision.scss";
import api from "../../api/api";
import getWeatherIcon from "../../utils/getWeatherIcon";

const Prevision = ({ coords }) => {
    const [forecastData, setForecastData] = React.useState([]);
    console.log("Coords:", coords);

    const fetchForecast = async () => {
        try {
            const data = await api.fetchForecast(coords.lat, coords.lon);
            console.log("API Response:", data); // Ajoutez cette ligne
            setForecastData(data.daily.slice(1, 7)); // Récupère les données des 6 prochains jours
        } catch (error) {
            alert("Un problème est intervenu, merci de revenir plus tard.");
        }
    };

    useEffect(() => {
        console.log("useEffect called", coords); // Ajoutez cette ligne
        if (coords) {
            fetchForecast();
        }
    }, [coords]);

    return (
        <section className="section">
            <ul className="prevision__list">
                {forecastData.map((day, index) => (
                    <li className="prevision_el" key={index}>
                        <p className="uppercase">
                            {new Date(day.dt * 1000).toLocaleDateString("fr-FR", {
                                weekday: "long",
                                day: "numeric",
                            })}
                        </p>

                        <img
                            src={getWeatherIcon(day.weather[0].description)}
                            alt={day.weather[0].description}
                        />
                        <div>{day.temp.day.toFixed(2)} °C</div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Prevision;
