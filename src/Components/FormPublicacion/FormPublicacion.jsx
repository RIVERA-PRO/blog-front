import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import alertActions from "../../Store/Alert/actions";
import { useParams } from 'react-router-dom';
import './FormPublicacion.css';
import { Link as Anchor } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import articulo from '../../img/articulo.png'
import video from '../../img/video.png'
import foto from '../../img/foto.png'
import portafolio from '../../img/portafolio.jpg'
import Spiral from '../Spiral/Spiral';
import AllPublicaciones from '../AllPublicaciones/AllPublicaciones';
import FormTrabajos from '../../Components/FormTrabajos/FormTrabajos'
const { open } = alertActions;

export default function FormPublicacion() {
    const [reloadCount, setReloadCount] = useState(0);
    let [editMode, setEditMode] = useState('info');
    const dispatch = useDispatch();
    const title = useRef();
    const cover_photo = useRef();
    const categoria = useRef();
    const description = useRef();
    let [modal, setModal] = useState(false);
    const [reload, setReload] = useState(false); // Nuevo estado para controlar la recarga
    let user = JSON.parse(localStorage.getItem('user'));
    let userId = user?.user_id;
    let nameUser = user?.name
    let mail = user?.mail
    let photo = user?.photo

    async function handleSubmit(e) {
        e.preventDefault();
        let data = {
            "title": title.current.value,
            "description": description.current.value,
            "cover_photo": cover_photo.current.value,
            "user_id": userId,
            "likes": 0,
            "categoria": categoria.current.value,
            "name": nameUser,
            "photo": photo,
            "mail": mail,
        };
        console.log(data);
        let url = 'https://dev2-lv2s.onrender.com/publicacion';
        let token = localStorage.getItem('token');
        let headers = { 'Authorization': `Bearer ${token}` };
        try {
            await axios.post(url, data, { headers: headers });
            console.log('Publicacion creada');
            setModal(!modal);
            let dataAlert = {
                icon: "success",
                title: "Publicacion creada",
                type: "toast"
            };
            dispatch(open(dataAlert));
            setReloadCount((prevCount) => prevCount + 1); // Incrementar el contador de recargas

        } catch (err) {
            console.log(err);
            setModal(!modal);
            let dataAlert = {
                icon: "error",
                title: err,
                type: "toast"
            };
            dispatch(open(dataAlert));
        }
    }

    const handleModal = (publicacion) => {
        setModal(!modal);
    };

    const [userData, setUserData] = useState(null);

    const updateUserData = () => {
        const user = localStorage.getItem('user');
        if (user) {
            setUserData(JSON.parse(user));
        }
    };

    useEffect(() => {
        updateUserData();
    }, []);


    return (
        <div className='formpPublicacion'>

            <div className='crear-publicacion-contain'>
                {userData ? (
                    <div className='userInfo-publicacion' onClick={() => handleModal()}>
                        <div className='img-input'>
                            <Anchor to={`/perfil/${userData.user_id}/${userData.name}`} > <img src={userData.photo} alt="User Avatar" /></Anchor>
                            <input type="text" placeholder='Crear Publicacion' />
                        </div>

                        <div className='publicacion-icon'>
                            <div className='icon'>    <img src={articulo} alt="" /> <p>Articulo</p></div>
                            <div className='icon'>   <img src={foto} alt="" /> <p>Foto</p></div>
                            <div className='icon'>  <img src={video} alt="" /> <p>Video</p></div>
                            <div className='icon'>  <img src={portafolio} alt="" /> <p>Empleo</p></div>
                        </div>

                    </div>
                ) : (
                    <div className='userInfo-publicacion'>
                        <p className='sin-sesion'>Inicia sesión para poder publicar</p>
                        <div className='publicacion-icon'>
                            <div className='icon'>    <img src={articulo} alt="" /> <p>Articulo</p></div>
                            <div className='icon'>   <img src={foto} alt="" /> <p>Foto</p></div>
                            <div className='icon'>  <img src={video} alt="" /> <p>Video</p></div>
                            <div className='icon'>  <img src={portafolio} alt="" /> <p>Empleo</p></div>
                        </div>
                    </div>
                )}


            </div>
            {modal &&
                <div className='form-modal-content'>

                    {editMode === 'info' ? (
                        <form onSubmit={handleSubmit} className='PublicacionFormulario' >

                            <div className='btnYcerrar'>
                                <div className='trabajo-publicacion-btn' onClick={() => setEditMode('password')}><p>Ir a crear trabajo <FontAwesomeIcon icon={faSignOutAlt} /></p></div>

                                <div className="cerrar" onClick={() => setModal(!modal)}>x</div>
                            </div>
                            <div className='contain-inputs'>
                                <p>Crear una publicación</p>
                                <div className='inputs'>
                                    <label >titulo</label>
                                    <input type="text" placeholder='titulo' required ref={title} />
                                </div>
                                <div className='inputs'>
                                    <label >Texto</label>
                                    <textarea type="text" placeholder='texto' required ref={description} />
                                </div>
                                <div className='inputs'>
                                    <label >Foto</label>
                                    <input type="url" placeholder='foto link' ref={cover_photo} />
                                </div>
                                <div className='inputs-Select'>
                                    <label>Categoría</label>
                                    <select required ref={categoria}>
                                        <option value="Anuncio">Anuncio</option>
                                        <option value="Oferta">Oferta</option>
                                        <option value="Búsqueda">Búsqueda</option>
                                        <option value="Noticia">Noticia</option>
                                    </select>
                                </div>


                                <button>Crear</button>
                            </div>


                        </form>
                    ) : (
                        <div className='PublicacionFormulario'>
                            <div className='btnYcerrar'>
                                <div className='trabajo-publicacion-btn' onClick={() => setEditMode('info')}><p>Ir a crear publicacion <FontAwesomeIcon icon={faSignOutAlt} /></p></div>

                                <div className="cerrar" onClick={() => setModal(!modal)}>x</div>
                            </div>
                            <div>
                                <FormTrabajos />
                            </div>
                        </div>

                    )}
                </div>
            }

            <AllPublicaciones reloadCount={reloadCount} />
        </div>
    );
}


