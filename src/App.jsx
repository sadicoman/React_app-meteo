import { useState, useEffect } from "react";
import "./_normalize.scss";
import "./App.scss";
import Weather from "./components/Weather/Weather";
import Prevision from "./components/prevision/prevision";

function App() {
    const [coords, setCoords] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCoords({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            });
        } else {
            alert("La géolocalisation n'est pas prise en charge par ce navigateur.");
        }
    }, []);

    return (
        <>
            <main>
                <Weather />
                {coords && <Prevision {...coords} />}
            </main>
        </>
    );
}

export default App;
