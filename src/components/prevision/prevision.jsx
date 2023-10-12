// src/components/prevision/prevision.jsx
import React, { useState, useEffect } from "react";
import "./prevision.scss";
import api from "../../api/api";
import getWeatherIcon from "../../utils/getWeatherIcon";

const Prevision = () => {
    const [forecastData, setForecastData] = useState([]);

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                // Supposons que ces coordonnées soient pour Namur, Belgique
                const lat = 50.4669;
                const lon = 4.8675;
                const data = await api.fetchForecast(lat, lon);
                setForecastData(data.daily.slice(1, 7)); // Récupère les données des 6 prochains jours
            } catch (error) {
                alert("Un problème est intervenu, merci de revenir plus tard.");
            }
        };

        fetchForecast();
    }, []);

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
