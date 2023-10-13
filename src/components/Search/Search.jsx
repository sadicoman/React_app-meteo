// src/components/Search/Search.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Search.scss"; // Vous pouvez créer un fichier SCSS pour styliser votre composant

const Search = ({ onSearch }) => {
    const [location, setLocation] = useState("");

    const handleLocationSubmit = (e) => {
        e.preventDefault();
        onSearch(location);
    };

    return (
        <form className="search-form" onSubmit={handleLocationSubmit}>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Entrez une ville"
                className="search-input"
            />
            <button type="submit" className="search-button">
                Chercher
            </button>
        </form>
    );
};

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default Search;
