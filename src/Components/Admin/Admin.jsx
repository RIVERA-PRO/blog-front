import React, { useState, useEffect } from "react";
import { Link as Anchor, } from "react-router-dom";
import './Admin.css'
import { useParams } from 'react-router-dom';
import { faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import alertActions from "../../Store/Alert/actions";
import { useDispatch, useSelector } from 'react-redux';
import actionUser from '../../Store/GetUser/Actions';
import BtnLog from '../btnLog/BtnLog';
import axios from "axios";

const { oneUser } = actionUser;
const { open } = alertActions;


export default function Admin() {
    let dispatch = useDispatch();
    const { destinos_id } = useParams()
    const [publicacion, setPublicacion] = useState([]);

    let token = localStorage.getItem('token')
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.user) {
            dispatch(oneUser({ user_id: user.user }));
        }
    }, [dispatch]);

    const idUser = useSelector((store) => store.getUser.user[0]);

    useEffect(() => {
        fetch("https://dev2-lv2s.onrender.com/publicacion", headers)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.destino)
                setPublicacion(data.publicaciones)


            });
    }, []);

    const acceso = publicacion?.map((publicacion) => publicacion?._id)
    console.log(acceso)
    const url = `https://dev2-lv2s.onrender.com/publicacion/${destinos_id}`
    useEffect(() => {
        fetch(url, headers)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            })
    }, [destinos_id])


    const [editingDestino, setEditingDestino] = useState(null);
    const [newTitle, setNewTitle] = useState('');

    const [newDescription, setNewDescription] = useState('');



    const [newCover_photo, setNewCover_photo] = useState('');

    const handleEditTitle = (event) => {
        setNewTitle(event.target.value)
    }

    const handleEditCover_photo = (event) => {
        setNewCover_photo(event.target.value);
    };










    const handleSaveTitle = (id) => {
        fetch(`https://dev2-lv2s.onrender.com/publicacion/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: newTitle,

                description: newDescription,
                cover_photo: newCover_photo,


            })

        })
            .then(response => response.json())
            .then(result => {
                // Actualizar el título del destino
                setPublicacion(publicacion => publicacion?.map(publicacion => publicacion?._id === id ? result?.publicacion : publicacion))
                setEditingDestino(null)
                let dataAlert = {
                    icon: "success",
                    title: "Edit success",
                    type: "toast"
                };
                dispatch(open(dataAlert));

            })
            .catch(error => {
                console.log(error)
                let dataAlert = {
                    icon: "error",
                    title: error,
                    type: "toast"
                };
                dispatch(open(dataAlert));
            })

    }

    const handleSaveTitle2 = (id) => {
        fetch(`https://dev2-lv2s.onrender.com/publicacion/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({



            })

        })
            .then(response => response.json())
            .then(result => {
                // Actualizar el título del destino
                setPublicacion(publicacion => publicacion?.map(publicacion => publicacion?._id === id ? result?.destino : publicacion))
                setEditingDestino(null)
                let dataAlert = {
                    icon: "success",
                    title: "Edit success",
                    type: "toast"
                };
                dispatch(open(dataAlert));
            })
            .catch(error => {
                console.log(error)
                let dataAlert = {
                    icon: "error",
                    title: error,
                    type: "toast"
                };
                dispatch(open(dataAlert));
            })
    }




    const handleDeleteDestino = async (id,) => {
        console.log(id)
        let token = localStorage.getItem('token')
        let headers = { headers: { 'Authorization': `Bearer ${token}` } }
        fetch(`https://dev2-lv2s.onrender.com/publicacion/${id}`, {
            method: 'DELETE',
            headers: headers.headers,
        })

            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then(result => {
                // Eliminar el destino de la lista
                setPublicacion(publicacion => publicacion.filter(publicacion => publicacion._id !== id))
                let dataAlert = {
                    icon: "success",
                    title: "Delete success",
                    type: "toast"
                };
                dispatch(open(dataAlert));
            })
            .catch(error => {
                console.log(error)
                let dataAlert = {
                    icon: "error",
                    title: error,
                    type: "toast"
                };
                dispatch(open(dataAlert));
            })
    }




    return (
        token && idUser?.is_admin ? (
            <div>

                <div className="destinos-list">

                    {publicacion?.map((publicacion) => (
                        <div className="list-destinos" key={publicacion?._id}>


                            <div className="delete-destino" onClick={() => handleDeleteDestino(publicacion?._id)} > <FontAwesomeIcon icon={faTrash} /> </div>
                            <div className="edit-destino" onClick={() => setEditingDestino(publicacion?._id)} > <FontAwesomeIcon icon={faEdit} /> </div>
                            {editingDestino === publicacion?._id &&
                                <button className="save" onClick={() => handleSaveTitle(publicacion?._id)}> <FontAwesomeIcon icon={faCheck} /></button>
                            }

                            {editingDestino === publicacion?._id ?
                                <input type="text" value={newCover_photo} placeholder="cover_photo url" onChange={handleEditCover_photo} />
                                :
                                <img src={publicacion?.cover_photo} onClick={() => setEditingDestino(publicacion?._id)} ></img>

                            }



                            <div className="list-text">

                                {editingDestino === publicacion?._id ?
                                    <input type="text" value={newTitle} placeholder="title" onChange={handleEditTitle} />
                                    :
                                    <span onClick={() => setEditingDestino(publicacion?._id)}>{publicacion?.title} </span>
                                }




                            </div>
                        </div>
                    ))}

                </div>

            </div>) : (<BtnLog />)
    )
}

