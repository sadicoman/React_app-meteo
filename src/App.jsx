import { useState, useEffect } from "react";
import "./_normalize.scss";
import "./App.scss";
import Weather from "./components/Weather/Weather";
import Prevision from "./components/prevision/prevision";
import Search from "./components/Search/Search";
import api from "./api/api";

function App() {
    const [coords, setCoords] = useState(null);
    console.log("Coords in App:", coords);

    const defaultLocation = { lat: 50.8503, lon: 4.3517 }; // Coordonnées de Bruxelles

    const handleLocationError = () => {
        setCoords(defaultLocation);
    };

    const handleSearch = async (location) => {
        console.log("handleSearch called with:", location); // Log existant
        try {
            const weatherData = await api.fetchWeather(location);
            console.log("Weather data:", weatherData); // Nouveau log
            setCoords({
                lat: weatherData.coord.lat,
                lon: weatherData.coord.lon,
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCoords({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                },
                handleLocationError, // Gestionnaire d'erreur ajouté ici
            );
        } else {
            handleLocationError();
            // alert("La géolocalisation n'est pas prise en charge par ce navigateur.");
        }
    }, []);

    return (
        <>
            <main>
                <Search onSearch={handleSearch} />
                <Weather coords={coords} />
                {coords && <Prevision coords={coords} />}
            </main>
        </>
    );
}

export default App;
