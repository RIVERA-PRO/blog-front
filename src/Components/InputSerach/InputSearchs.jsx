import React, { useState, useEffect } from "react";
import './InputSearchs.css';

export default function InputSearchs() {
    const [destinos, setDestinos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredDestinos, setFilteredDestinos] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/publicacion")
            .then((response) => response.json())
            .then((data) => {
                console.log(data.publicaciones);
                setDestinos(data.publicaciones);
            })
            .catch((error) => {
                console.log(error);
                setTimeout(() => {
                    setDestinos([]); // Limpia los destinos para que no muestre resultados
                    setFilteredDestinos([]);
                    setShowResults(false);
                    setNoResults(false);
                }, 3000); // Espera 2 segundos antes de limpiar los resultados
            });
    }, []);

    useEffect(() => {
        if (destinos) {
            const results = destinos.filter((destino) => {
                return destino.title.toLowerCase().includes(searchTerm.toLowerCase());
            });
            setFilteredDestinos(results);
            setShowResults(searchTerm !== "");
            setNoResults(searchTerm !== "" && results.length === 0);
        }
    }, [destinos, searchTerm]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Buscar trabajos..."
                value={searchTerm}
                onChange={handleSearch}
                className="inputJobs"
            />
            {showResults && (
                <div className="modal">
                    {filteredDestinos.map((destino) => (
                        <div key={destino._id}>
                            <a href={`/details/${destino._id}`}>{destino.title}</a>
                            <hr />
                        </div>
                    ))}
                    {noResults && <p>No se encontraron resultados.</p>}
                </div>
            )}
        </div>
    );
}
