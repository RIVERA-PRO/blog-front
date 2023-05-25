import React, { useState, useEffect } from "react";
import Spiral from "../Spiral/Spiral";
import { Link as Anchor } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './AllTrabajos.css'

export default function AllTrabajos() {
    const [trabajos, setTrabajos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [showPreview, setShowPreview] = useState(false);
    const [selectedTrabajo, setSelectedTrabajo] = useState(null);
    const [categoria, setCategoria] = useState("");
    const categoriasUnicas = [...new Set(trabajos.map((trabajos) => trabajos.categoria))];
    const [salario, setSalario] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [lugar, setLugar] = useState("");
    const [error, setError] = useState(false);

    const date = new Date(selectedTrabajo?.createdAt);
    const hour = date.getHours();
    const minutes = date.getMinutes();

    let token = localStorage.getItem("token");
    let headers = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        fetch("https://dev2-lv2s.onrender.com/trabajos", headers)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.trabajos);

                // Ordenar los trabajos por fecha de creación descendente
                const sortedTrabajos = data.trabajos.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateB - dateA;
                });

                setTrabajos(sortedTrabajos);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error en la petición:", error);
                setError(true);
            });
    }, []);


    useEffect(() => {
        fetch("https://dev2-lv2s.onrender.com/trabajos", headers)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.trabajos);
                const sortedTrabajos = data.trabajos.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateB - dateA;
                });

                setTrabajos(sortedTrabajos);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error en la petición:", error);
                setError(true);
            });
    }, [salario]);

    useEffect(() => {
        const url = `https://dev2-lv2s.onrender.com/trabajos?ubicacion=${ubicacion}`;
        fetch(url, headers)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.trabajos);
                const sortedTrabajos = data.trabajos.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateB - dateA;
                });

                setTrabajos(sortedTrabajos);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error en la petición:", error);
                setError(true);
            });
    }, [ubicacion]);

    const handlePreviewClick = (trabajo) => {
        console.log("Mostrar vista previa para destino:", trabajo);
        setShowPreview(true);
        localStorage.setItem("selectedDestino", JSON.stringify(trabajo));
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);


    let user = JSON.parse(localStorage.getItem("user"));
    let userId = user?.user_id;


    if (isLoading) {
        return (
            <div className="espiral-contain">
                {/* {error && (
                    <div className="alert-error">Error en la petición. Inténtalo nuevamente.</div>
                )} */}
                <Spiral />
            </div>
        );
    } else {
        const filteredDestinos = trabajos?.filter(
            (trabajo) =>
                trabajo?.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (categoria === "" || trabajo?.categoria === categoria) &&
                (salario === "" ||
                    (salario === "80000" && trabajo?.salario <= 80000) ||
                    (salario === "90000" &&
                        trabajo?.salario > 80000 &&
                        trabajo?.salario <= 90000) ||
                    (salario === "100000" &&
                        trabajo?.salario > 90000 &&
                        trabajo?.salario <= 200000) ||
                    (salario === "200000" &&
                        trabajo?.salario > 200000 &&
                        trabajo?.salario <= 200000) ||
                    (salario === "200000" && trabajo?.salario > 200000)) &&
                (ubicacion === "" || trabajo?.ubicacion === ubicacion) &&
                (lugar === "" || trabajo?.lugar === lugar)
        );




        return (
            <div className="contain-trabajos">

                <div className="contain">
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}

                        loop={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                        }}
                        pagination={{ el: '.swiper-pagination', clickable: true }}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                            clickable: true,
                        }}
                        onSwiper={(swiper) => console.log(swiper)}
                        className="swiper_container"
                    >
                        <SwiperSlide> <div>

                            <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                                <option value="">Categorias</option>
                                {categoriasUnicas.map((categoria) => (
                                    <option key={categoria} value={categoria}>
                                        {categoria}
                                    </option>
                                ))}
                            </select>
                        </div></SwiperSlide>
                        <SwiperSlide>  <div>
                            <select value={salario} onChange={(e) => setSalario(e.target.value)}>
                                <option value="">Salarios</option>
                                <option value="80000">$80000 o menos</option>
                                <option value="90000">$80000 - $90000</option>
                                <option value="100000">$90000 - $100000</option>
                                <option value="200000">$100000 - $200000</option>
                                <option value="200000">$200000 o más</option>
                            </select>
                        </div></SwiperSlide>
                        <SwiperSlide>  <div>
                            <select
                                value={ubicacion}
                                onChange={(e) => setUbicacion(e.target.value)}
                            >
                                <option value="">Departamentos</option>
                                <option value="Otros">Otros</option>
                                <option value="Salta">Salta</option>
                                <option value="Anta">Anta</option>
                                <option value="Cachi">Cachi</option>
                                <option value="Cafayate">Cafayate</option>
                                <option value="Cerrillos">Cerrillos</option>
                                <option value="Chicoana">Chicoana</option>
                                <option value="General Güemes">General Güemes</option>
                                <option value="Guachipas">Guachipas</option>
                                <option value="Iruya">Iruya</option>
                                <option value="La Caldera">La Caldera</option>
                                <option value="La Candelaria">La Candelaria</option>
                                <option value="La Poma">La Poma</option>
                                <option value="La Viña">La Viña</option>
                                <option value="Los Andes">Los Andes</option>
                                <option value="Metán">Metán</option>
                                <option value="Molinos">Molinos</option>
                                <option value="Orán">Orán</option>
                                <option value="Rivadavia">Rivadavia</option>
                                <option value="Rosario de la Frontera">Rosario de la Frontera</option>
                                <option value="Rosario de Lerma">Rosario de Lerma</option>
                                <option value="San Carlos">San Carlos</option>
                                <option value="San Martín">San Martín</option>
                                <option value="Santa Victoria">Santa Victoria</option>
                            </select>
                        </div></SwiperSlide>
                        <SwiperSlide> <div>

                            <select id="lugar" value={lugar} onChange={(e) => setLugar(e.target.value)}>
                                <option value="">Ubicaciones</option>
                                {trabajos && [...new Set(trabajos.map((trabajo) => trabajo.lugar))].map((lugar) => (
                                    <option key={lugar} value={lugar}>
                                        {lugar}
                                    </option>
                                ))}
                            </select>
                        </div></SwiperSlide>

                    </Swiper>

                    <div className="slider-controler">
                        <div className="swiper-button-prev slider-arrow">
                            <ion-icon name="arrow-back-outline"></ion-icon>
                        </div>
                        <div className="swiper-button-next slider-arrow">
                            <ion-icon name="arrow-forward-outline"></ion-icon>
                        </div>
                        <div className="swiper-pagination"></div>
                    </div>



                </div>

                <div className="jobs-contain-total">

                    <div className="trabajos-contain">
                        <div className="inputsearch">
                            <input
                                type="text"
                                placeholder="Buscar...."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="scrolll">
                            {filteredDestinos?.length > 0 ? (
                                filteredDestinos.map((trabajo) => (
                                    <div className="card-trabajos" key={trabajo?._id}>
                                        <div>

                                            <div className="card-text">
                                                <h2 id="title-cardtext">{trabajo?.title.slice(0, 30)}..</h2>
                                                <div className="card-text-ubi-modal">
                                                    <h6>{trabajo?.ubicacion}, {trabajo?.lugar}</h6>
                                                    <div className="card-text-modalidad">
                                                        <p>{trabajo.modalidad}</p>
                                                    </div>
                                                </div>
                                                <div className="info-user-jobs">
                                                    <img className="info-user-img" src={trabajo?.photo} alt="" />
                                                    <div className="info-p">
                                                        <p>{trabajo?.name}</p>
                                                    </div>
                                                </div>
                                                <div className="price-link">

                                                    <button className="btn-preview" onClick={() => setSelectedTrabajo(trabajo) && handlePreviewClick()}>
                                                        Ver <FontAwesomeIcon icon={faSignOutAlt} />
                                                    </button>

                                                    <Anchor
                                                        className="btn-details"
                                                        to={`/details/${trabajo?._id}`}
                                                    >
                                                        Ver <FontAwesomeIcon icon={faSignOutAlt} />
                                                    </Anchor>
                                                    {trabajo.user_id === userId ? (
                                                        <Anchor
                                                            className="btn-detail"
                                                            to={`/details/${trabajo?._id}`}
                                                        >
                                                            Edit
                                                        </Anchor>
                                                    ) : null}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="results-no-found">No hay resultados</p>
                            )}
                        </div>
                    </div>

                    <div className="trabajo-details-contain">

                        <div className="trabajo-details">
                            {selectedTrabajo ? (
                                <div className="jobs-contain-body-heeader-footer">
                                    <div className="jobs-header">
                                        <div className="jobs-header-text">
                                            <h2>{selectedTrabajo.title}</h2>
                                            <h5>{selectedTrabajo.ubicacion}, {selectedTrabajo.lugar}</h5>
                                            <h6>Fecha: {selectedTrabajo?.createdAt?.slice(0, 10)} - {hour}:{minutes}hs</h6>
                                        </div>

                                    </div>
                                    <hr className="hr" />
                                    <div className="jobs-jornada-modalidad">
                                        <p> {selectedTrabajo.categoria}</p>
                                        <p>Jornada {selectedTrabajo.jornada}</p>
                                        <p>{selectedTrabajo.modalidad}</p>
                                    </div>
                                    <div className="jobs-body">
                                        <p>{selectedTrabajo.description}</p>
                                        <p>Requisitos: <br />{selectedTrabajo.requisitos}</p>
                                        <p>Salario ${selectedTrabajo.salario}</p>
                                        <p>Vacantes {selectedTrabajo.vacantes}</p>
                                    </div>

                                    <div className="jobs-footer">
                                        <p>Publicado por:</p>
                                        <div className="info-user-jobs">
                                            <Anchor to={`/perfil/${selectedTrabajo.user_id}/${selectedTrabajo?.name}`} > <img className="info-user-img" src={selectedTrabajo.photo} alt="" /></Anchor>

                                            <div className="info-p">
                                                <Anchor to={`/perfil/${selectedTrabajo.user_id}/${selectedTrabajo?.name}`} > {selectedTrabajo.name}</Anchor>

                                                <p>{selectedTrabajo.mail}</p>

                                            </div>
                                        </div>
                                        <div>

                                        </div>
                                    </div>



                                    <div className="redes-sociales-jobs">
                                        {selectedTrabajo.web && (
                                            <a href={`tel:${selectedTrabajo.telefono}`}>
                                                <img src='../../img/telefono.png' alt={selectedTrabajo.telefono} />
                                                {selectedTrabajo.telefono}
                                            </a>
                                        )}
                                        {selectedTrabajo.web && (
                                            <a href={selectedTrabajo.web} target="_blank" rel="noopener noreferrer">
                                                <img src="../../img/web.png" alt={selectedTrabajo.web} /> {selectedTrabajo.web}
                                            </a>
                                        )}
                                        {selectedTrabajo.facebook && (
                                            <a href={selectedTrabajo.facebook} target="_blank" rel="noopener noreferrer">
                                                <img src="../../img/facebook.png" alt={selectedTrabajo.facebook} /> {selectedTrabajo.facebook}
                                            </a>
                                        )}
                                        {selectedTrabajo.instagram && (
                                            <a href={selectedTrabajo.instagram} target="_blank" rel="noopener noreferrer">
                                                <img src="../../img/instagram.png" alt={selectedTrabajo.instagram} /> {selectedTrabajo.instagram}
                                            </a>
                                        )}

                                    </div>


                                </div>
                            ) : (
                                <div className="select-trabajo"></div>
                            )}
                        </div>



                    </div>
                </div>

            </div>
        );
    }
}
