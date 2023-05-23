import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Detail.css";
import Spiral from "../Spiral/Spiral";
import { Link as Anchor } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlane, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import alertActions from "../../Store/Alert/actions";
import { useDispatch } from "react-redux";

const { open } = alertActions;


export default function Detail() {
    let dispatch = useDispatch();
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [carrito, setCarrito] = useState([]);
    const [showLightbox, setShowLightbox] = useState(false);
    const [showLightbox2, setShowLightbox2] = useState(false);
    const [showLightbox3, setShowLightbox3] = useState(false);
    const [selectedDestino, setSelectedDestino] = useState(null);

    const date = new Date(selectedDestino?.createdAt);



    let token = localStorage.getItem('token')
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }

    useEffect(() => {
        fetch(`http://localhost:8080/trabajos/${id}`, headers)
            .then((response) => response.json())
            .then((data) => {
                setProducto(data.trabajo);
                console.log(data.trabajo)
            });
    }, [id]);





    useEffect(() => {
        const cart = localStorage.getItem('carrito');
        if (cart) {
            setCarrito(JSON.parse(cart));
        }
    }, []);





    if (!producto) {
        return (
            <div className="espiral-contain">
                <Spiral />
            </div>
        );
    }

    return (
        <div className="contain-detail">
            <div className="detail-contain">
                <div className="jobs-contain-body-heeader-footer">
                    <div className="jobs-header">
                        <div className="jobs-header-text">
                            <h2>{producto.title}</h2>
                            <h5>{producto.ubicacion}, {producto.lugar}</h5>
                            <h6>Fecha: {producto?.createdAt?.slice(0, 10)} </h6>
                        </div>
                    </div>
                    <hr className="hr" />
                    <div className="jobs-jornada-modalidad">
                        <p> {producto.categoria}</p>
                        <p>Jornada {producto.jornada}</p>
                        <p>{producto.modalidad}</p>
                    </div>
                    <div className="jobs-body">
                        <p>{producto.description}</p>
                        <p>Requisitos: <br />{producto.requisitos}</p>
                        <p>Salario ${producto.salario}</p>
                        <p>Vacantes {producto.vacantes}</p>
                    </div>

                    <div className="jobs-footer">
                        <p>Publicado por:</p>
                        <div className="info-user-jobs">
                            <Anchor to={`/perfil/${producto.user_id}/${producto?.name}`} > <img className="info-user-img" src={producto.photo} alt="" /></Anchor>

                            <div className="info-p">
                                <Anchor to={`/perfil/${producto.user_id}/${producto?.name}`} > {producto.name}</Anchor>

                                <p>{producto.mail}</p>

                            </div>
                        </div>

                    </div>
                    <div className="redes-sociales-jobs">
                        {producto.web && (
                            <a href={`tel:${producto.telefono}`}>
                                <img src='../../img/telefono.png' alt={producto.telefono} />
                                {producto.telefono}
                            </a>
                        )}
                        {producto.web && (
                            <a href={producto.web} target="_blank" rel="noopener noreferrer">
                                <img src="../../img/web.png" alt={producto.web} /> {producto.web}
                            </a>
                        )}
                        {producto.facebook && (
                            <a href={producto.facebook} target="_blank" rel="noopener noreferrer">
                                <img src="../../img/facebook.png" alt={producto.facebook} /> {producto.facebook}
                            </a>
                        )}
                        {producto.instagram && (
                            <a href={producto.instagram} target="_blank" rel="noopener noreferrer">
                                <img src="../../img/instagram.png" alt={producto.instagram} /> {producto.instagram}
                            </a>
                        )}

                    </div>


                </div>
            </div>


        </div >
    );
}
