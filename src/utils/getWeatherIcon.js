// src/utils/getWeatherIcon.js

const getWeatherIcon = (description) => {
    // Convertit la description en minuscules pour une correspondance fiable
    const weatherDescription = description.toLowerCase();

    // Utilise une instruction switch pour déterminer l'icône météo en fonction de la description
    switch (weatherDescription) {
        case "clear sky": // Pour un ciel clair
            return "src/assets/images/sun.png"; // Retourne l'URL de l'icône représentant un soleil

        case "few clouds": // Pour une légère couverture nuageuse
            return "src/assets/images/few_clouds.png"; // Retourne l'URL de l'icône représentant quelques nuages
        case "broken clouds": // Pour une couverture nuageuse fragmentée
            return "src/assets/images/cloudy.png"; // Retourne l'URL de l'icône représentant une couverture nuageuse

        case "shower rain": // Pour des averses de pluie
        case "rain": // Pour de la pluie
            return "src/assets/images/rain.png"; // Retourne l'URL de l'icône représentant de la pluie

        case "thunderstorm": // Pour un orage
            return "src/assets/images/thunderstorm.png"; // Retourne l'URL de l'icône représentant un orage

        case "snow": // Pour de la neige
            return "src/assets/images/snow.png"; // Retourne l'URL de l'icône représentant de la neige

        case "mist": // Pour de la brume
            return "src/assets/images/mist.png"; // Retourne l'URL de l'icône représentant de la brume
        case "overcast clouds":
            return "src/assets/images/overcast.png"; //
        case "moderate rain":
            return "src/assets/images/moderate_rain.png"; //
        case "scattered clouds":
            return "src/assets/images/scattered_clouds.png"; //
        default:
            // Pour tout autre état météorologique non pris en charge
            return "src/assets/images/default.png"; // Retourne l'URL de l'icône par défaut
    }
};

export default getWeatherIcon; // Exporte la fonction getWeatherIcon pour l'utiliser dans d'autres fichiers
