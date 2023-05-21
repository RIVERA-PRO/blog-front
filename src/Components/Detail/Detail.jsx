import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Detail.css";
import Spiral from "../Spiral/Spiral";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlane, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import alertActions from "../../Store/Alert/actions";
import { useDispatch } from "react-redux";

const { open } = alertActions;


export default function Detail() {
    // let dispatch = useDispatch();
    // const { id } = useParams();
    // const [producto, setProducto] = useState(null);
    // const [carrito, setCarrito] = useState([]);
    // const [showLightbox, setShowLightbox] = useState(false);
    // const [showLightbox2, setShowLightbox2] = useState(false);
    // const [showLightbox3, setShowLightbox3] = useState(false);
    // const [selectedDestino, setSelectedDestino] = useState(null);

    // const date = new Date(selectedDestino?.createdAt);



    // let token = localStorage.getItem('token')
    // let headers = { headers: { 'Authorization': `Bearer ${token}` } }

    // useEffect(() => {
    //     fetch(`http://localhost:8080/destinos/${id}`, headers)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setProducto(data.destino);
    //             console.log(data.destino)
    //         });
    // }, [id]);





    // useEffect(() => {
    //     const cart = localStorage.getItem('carrito');
    //     if (cart) {
    //         setCarrito(JSON.parse(cart));
    //     }
    // }, []);





    // if (!producto) {
    //     return (
    //         <div className="espiral-contain">
    //             <Spiral />
    //         </div>
    //     );
    // }

    return (
        <div className="contain-detail">
            {/* <div className="detail-contain">
                <div className="jobs-contain-body-heeader-footer">
                    <div className="jobs-header">
                        <div className="jobs-header-text">
                            <h2>{producto.title}</h2>
                            <h5>{producto.ubicacion}, {producto.lugar}</h5>
                            <h6>Fecha: {producto?.createdAt?.slice(0, 10)} </h6>
                        </div>
                        <img src={producto.cover_photo} alt="" />
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
                            <img className="info-user-img" src={producto.photo} alt="" />
                            <div className="info-p">
                                <p>{producto.name}</p>
                                <p>{producto.mail}</p>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>



                </div>
            </div> */}


        </div >
    );
}
