import React, { useState, useEffect } from "react";
import Spiral from "../Spiral/Spiral";
import { Link as Anchor } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './TrabajosHome.css';

export default function TrabajosHome() {
    const [loading, setLoading] = useState(true);
    const [trabajos, setTrabajos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    let token = localStorage.getItem("token");
    let headers = { headers: { Authorization: `Bearer ${token}` } };
    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:8080/trabajos", headers)

                .then((response) => response.json())
                .then((data) => {
                    console.log(data.trabajos);

                    // Mezclar los trabajos de manera aleatoria
                    const shuffledTrabajos = shuffleArray(data.trabajos);
                    // Obtener los primeros 8 trabajos aleatorios
                    const randomTrabajos = shuffledTrabajos.slice(0, 10);
                    setTrabajos(randomTrabajos);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error en la petición:", error);
                    setError(true);
                });
        }, 2000);
    }, []);

    // Función para mezclar el arreglo de trabajos de manera aleatoria
    const shuffleArray = (array) => {
        let currentIndex = array.length;
        let temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    return (
        <div className="trabajos-home">

            <div>
                <h5>Trabajos que te podrían interesar</h5>
                {trabajos.map((trabajo) => (
                    <div key={trabajo?._id} className="trabajos-card">
                        <h6 id="title-cardtext">{trabajo?.title.slice(0, 40)}..</h6>

                        <h6>{trabajo?.ubicacion}, {trabajo?.lugar}</h6>
                        <div className="modalidad-btn">

                            <Anchor
                                className="btn-details-home"
                                to={`/details/${trabajo?._id}`}
                            >
                                Ver <FontAwesomeIcon icon={faSignOutAlt} />
                            </Anchor>

                        </div>
                        <hr />
                    </div>
                ))}
                <Anchor className="ver-mas-pagina" to={`/trabajos`} >Ver más trabajos  <FontAwesomeIcon icon={faSignOutAlt} /></Anchor>
            </div>


        </div>
    )
}
