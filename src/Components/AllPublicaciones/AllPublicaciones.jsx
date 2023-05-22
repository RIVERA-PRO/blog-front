import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import './AllPublicaciones.css';
import Swal from 'sweetalert2';
import Spiral from '../Spiral/Spiral';
import { faTrash, faEdit, faCheck, faPaperPlane, faTimes, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link as Anchor } from "react-router-dom";
import { useDispatch } from "react-redux";
import alertActions from "../../Store/Alert/actions";
const { open } = alertActions;


export default function AllPublicaciones({ reloadCount }) {
    const dispatch = useDispatch();
    const [publicaciones, setPublicaciones] = useState([]);
    const [comentarios, setComentarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    let [modal, setModal] = useState(false);
    let token = localStorage.getItem('token');
    let headers = { headers: { 'Authorization': `Bearer ${token}` } };

    useEffect(() => {
        fetchPublicaciones();
        fetchComentarios();
    }, [reloadCount]);

    // ...

    const fetchPublicaciones = () => {
        setTimeout(() => {
            fetch('https://dev2-lv2s.onrender.com/publicacion', headers)
                .then(response => response.json())
                .then(data => {
                    // Ordenar las publicaciones por fecha de creación (de la más reciente a la más antigua)
                    const sortedPublicaciones = data.publicaciones.sort((a, b) => {
                        const dateA = new Date(a.createdAt);
                        const dateB = new Date(b.createdAt);
                        return dateB - dateA;
                    });

                    setPublicaciones(sortedPublicaciones);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error al obtener las publicaciones:', error);
                    showErrorAlert();
                    setLoading(false);
                });
        }, 4000); // Simular tiempo de carga de 2 segundos
    };

    // ...


    const fetchComentarios = () => {
        setTimeout(() => {
            fetch(`https://dev2-lv2s.onrender.com/comments`, headers)
                .then(response => response.json())
                .then(data => {
                    setComentarios(data.comments)
                    console.log(data.publicaciones)
                    console.log(data.comments)
                })
                .catch(error => {
                    console.error('Error al obtener los comentarios:', error);
                    showErrorAlert();
                });
        }, 4000); // Simular tiempo de carga de 2 segundos
    };

    const showErrorAlert = () => {
        Swal.fire({
            title: '¡Ops!',
            text: 'Ha ocurrido un error al obtener los datos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    };

    const [selectedPublicacion, setSelectedPublicacion] = useState(null);

    // ...
    const [selectedPublicacionId, setSelectedPublicacionId] = useState(null);

    const handleModal = (publicacion) => {
        if (comentarios && Array.isArray(comentarios)) {
            const comentariosPublicacion = comentarios.filter(
                (comentario) => comentario.publicacion_id === publicacion._id
            );
            setSelectedPublicacion(comentariosPublicacion);
            setSelectedPublicacionId(publicacion._id);
            setModal(!modal);
        }
    };






    const publicacionesConComentarios = publicaciones && publicaciones.length > 0
        ? publicaciones.map(publicacion => {
            const comentariosPublicacion = comentarios.filter(comentario => comentario.publicacion_id === publicacion._id);
            console.log(comentariosPublicacion);

            return { ...publicacion, comentarios: comentariosPublicacion };
        })
        : [];

    const [comentarioText, setComentarioText] = useState('');


    const handleComentarioTextChange = (event) => {
        setComentarioText(event.target.value);
    };

    const actualizarComentarios = (nuevoComentario) => {
        // Asigna los datos del usuario al comentario
        nuevoComentario.user_id = {
            name: 'Nombre del usuario',
            photo: 'URL de la foto del usuario'
        };

        setComentarios([...comentarios, nuevoComentario]);
        fetchComentarios(); // Actualiza la lista de comentarios nuevamente
    };


    // ...

    // ...
    const handleCrearComentario = (event) => {
        event.preventDefault();

        const comentario = {
            text: comentarioText
        };

        const url = `https://dev2-lv2s.onrender.com/comments?id=${params.id}`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(comentario)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Comentario creado:', data);
                actualizarComentarios(data);
                setComentarioText('');
                setModal(false);
                let dataAlert = {
                    icon: "success",
                    title: "Comentario creado",
                    type: "toast"
                };
                dispatch(open(dataAlert));

            })
            .catch(error => {
                console.error('Error al crear el comentario:', error);
                let dataAlert = {
                    icon: "success",
                    title: "Error al crear el comentario",
                    type: "toast"
                };
                dispatch(open(dataAlert));
            });
    };

    const [editComentario, setEditComentario] = useState(null);
    const [editComentarioText, setEditComentarioText] = useState('');
    const [editingComment, setEditingComment] = useState(false);
    const [editedCommentText, setEditedCommentText] = useState('');

    const handleEditarComentario = (comentario) => {
        setEditComentario(comentario);
        setEditComentarioText(comentario.text);
    };
    const cancelarEdicionComentario = () => {
        setEditingComment(false);
        setEditComentario(null);
        setEditComentarioText('');
    };

    const handleEditComentarioTextChange = (event) => {
        setEditComentarioText(event.target.value);
    };

    const handleEditarComentarioSubmit = (event) => {
        event.preventDefault();

        const updatedComentarios = comentarios.map((comentario) => {
            if (comentario._id === editComentario._id) {
                return {
                    ...comentario,
                    text: editComentarioText
                };
            }
            return comentario;
        });

        setComentarios(updatedComentarios);
        setModal(false);
        let dataAlert = {
            icon: "success",
            title: "Comentario actualizado",
            type: "toast"
        };
        dispatch(open(dataAlert));
    };


    /*eliminar----*/
    const handleEliminarComentario = (comentarioId) => {
        setModal(false);
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'El comentario será eliminado permanentemente',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `https://dev2-lv2s.onrender.com/comments/${comentarioId}`;

                fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            // Elimina el comentario del estado 'comentarios'
                            const updatedComentarios = comentarios.filter(comentario => comentario._id !== comentarioId);
                            setComentarios(updatedComentarios);
                            let dataAlert = {
                                icon: "success",
                                title: "Comentario eliminado",
                                type: "toast"
                            };
                            dispatch(open(dataAlert));
                        } else {
                            console.error('Error al eliminar el comentario:', response.statusText);
                            Swal.fire({
                                title: '¡Error!',
                                text: 'Ha ocurrido un error al eliminar el comentario',
                                icon: 'error',
                                confirmButtonText: 'Aceptar'
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error al eliminar el comentario:', error);
                        Swal.fire({
                            title: '¡Error!',
                            text: 'Ha ocurrido un error al eliminar el comentario',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                    });
            }
        });
    };

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchPublicaciones();
        fetchComentarios();
        updateUserData();
    }, []);

    const updateUserData = () => {
        const user = localStorage.getItem('user');
        if (user) {
            setUserData(JSON.parse(user));
        }
    };
    const [showFullText, setShowFullText] = useState(false);
    const descriptionRef = useRef();
    const handleToggleText = () => {
        setShowFullText(!showFullText);
        console.log(showFullText)
    };

    /*edit-public*/
    const [reloadPublicacion, setReloadPublicacion] = useState(false);

    const [publicacion, setPublicacion] = useState([]);
    const [editingPublicacion, setEditingPublicacin] = useState(null);
    const [newTitle, setNewTitle] = useState('');

    const [newDescription, setNewDescription] = useState('');



    const [newCover_photo, setNewCover_photo] = useState('');

    const handleEditTitle = (event) => {
        setNewTitle(event.target.value)
    }

    const handleEditCover_photo = (event) => {
        setNewCover_photo(event.target.value);
    };


    const handleEditDescription = (event) => {
        setNewDescription(event.target.value);
    };






    const handleSaveTitle = (id) => {

        if (newTitle.trim() === '' || newDescription.trim() === '' || newCover_photo.trim() === '') {
            let dataAlert = {
                icon: "error",
                title: "Los campos no pueden estar vacíos",
                type: "toast"
            };
            dispatch(open(dataAlert));
            return;
        }


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
                setEditingPublicacin(null)
                let dataAlert = {
                    icon: "success",
                    title: "Publicacion editada",
                    type: "toast"
                };
                dispatch(open(dataAlert));
                window.location.reload();
            })
            .catch(error => {
                console.log(error)
                let dataAlert = {
                    icon: "error",
                    title: error,
                    type: "toast"
                };
                dispatch(open(dataAlert));
            });
    }






    const handleDeletePublicacion = async (id,) => {
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
                // Eliminar el publicacion de la lista
                setPublicacion(publicacion => publicacion.filter(publicacion => publicacion._id !== id))
                let dataAlert = {
                    icon: "success",
                    title: "Publicacion eliminada",
                    type: "toast"
                };
                dispatch(open(dataAlert));
                window.location.reload();
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
        <div className='AllPublicaciones'>
            {loading ? (
                <Spiral />
            ) : (
                <div className="publicacion-contain">
                    {publicaciones && publicacionesConComentarios.length > 0 ? (
                        publicacionesConComentarios.map(publicacion => (
                            <div key={publicacion._id} className='publicacion'>

                                <div className='name-photo'>

                                    <Anchor to={`/perfil/${publicacion.user_id}/${publicacion?.name}`} > <img src={publicacion?.photo} alt="" /></Anchor>
                                    <div>
                                        <Anchor to={`/perfil/${publicacion?.user_id}/${publicacion?.name}`} > {publicacion.name.slice(0, 15)}</Anchor>
                                        <h5>{new Date(publicacion.createdAt).toLocaleString()}</h5>
                                    </div>
                                </div>
                                <div className='hr'><hr /></div>
                                {publicacion.user_id === userData?.user_id && (
                                    <div className="edit-btn" key={publicacion?._id}>
                                        <div className='edit-delete-publicacion-btns'>
                                            <div className="delete-btn" onClick={() => handleDeletePublicacion(publicacion?._id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </div>
                                            <div className="edit-btn" onClick={() => setEditingPublicacin(publicacion?._id)}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </div>
                                        </div>


                                        {editingPublicacion === publicacion?._id ? (
                                            <div className='form-edit-public'>
                                                <input type="text" required value={newTitle} placeholder="title" onChange={handleEditTitle} />
                                                <input type="text" required value={newCover_photo} placeholder="cover_photo url" onChange={handleEditCover_photo} />
                                                <input type="text" required value={newDescription} placeholder="description" onChange={handleEditDescription} />
                                                <div className='cancel-save'>
                                                    <button className="save" onClick={() => handleSaveTitle(publicacion?._id)}>
                                                        <FontAwesomeIcon icon={faPaperPlane} />

                                                    </button>
                                                    <button className="cancel" onClick={() => setEditingPublicacin(null)}>
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </button>
                                                </div>
                                            </div>
                                        ) : null}

                                    </div>
                                )}




                                <div className='title-cover_photo'>

                                    <p>{publicacion?.title}</p>
                                    <div className='ver-descriptcion'>
                                        {showFullText ? (
                                            <h5>{publicacion?.description}</h5>
                                        ) : (
                                            <h5>{publicacion?.description.slice(0, 90)}</h5>
                                        )}
                                        {publicacion?.description.length > 100 && (
                                            <button className='verMas-Menos' onClick={handleToggleText}>
                                                {showFullText ? "Ver menos" : "Ver más"}
                                            </button>
                                        )}
                                    </div>
                                    <img src={publicacion?.cover_photo} alt="" />
                                </div>

                                <div className='hr'><hr /></div>
                                <div className='cometarios-cantidad'>
                                    <p className='categoria-comento-p'>{publicacion?.categoria.slice(0, 15)}</p>
                                    <hr />
                                    <Link to={`/publicaciones/${publicacion._id}`}>
                                        <button className='btn-cantidad-comments' onClick={() => handleModal(publicacion)}>   <FontAwesomeIcon icon={faComment} />  Comentar </button>
                                    </Link>
                                    <hr />
                                    <p className='canti-com-p'>  {publicacion?.comentarios?.length} comentarios</p>

                                </div>



                                {modal && selectedPublicacion && (
                                    <div className='modal-sub-comments'>
                                        <div className="submodal-comments">
                                            <div className='title-cerrar'>
                                                <div><p>Comentarios</p></div>
                                                <div className="cerrar" onClick={() => setModal(!modal)}>x</div>
                                            </div>
                                            {selectedPublicacion.map(comentario => (
                                                <div className='comentarios' key={comentario._id}>

                                                    <Anchor to={`/perfil/${comentario.user_id._id}/${comentario?.user_id?.name}`} > <img src={comentario?.user_id?.photo} alt="" /></Anchor>
                                                    <div className='name-text'>
                                                        <Anchor to={`/perfil/${comentario.user_id._id}/${comentario?.user_id?.name}`} >{comentario?.user_id?.name}</Anchor>
                                                        <h6>{new Date(comentario?.createdAt).toLocaleString()}</h6>
                                                        <div className='comentario'>
                                                            <p>{comentario?.text}</p>
                                                        </div>
                                                    </div>
                                                    {comentario.user_id?._id === userData?.user_id && (

                                                        <div>

                                                            {editComentario && editComentario._id === comentario._id ? (
                                                                <div>
                                                                    <form onSubmit={handleEditarComentarioSubmit} className='form-edit-comment'>
                                                                        <input
                                                                            className='input-edit-comment'
                                                                            type="text"
                                                                            required
                                                                            value={editComentarioText}
                                                                            onChange={handleEditComentarioTextChange}
                                                                        />

                                                                        <button type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
                                                                        <button onClick={cancelarEdicionComentario}><FontAwesomeIcon icon={faTimes} /></button>

                                                                    </form>
                                                                </div>
                                                            ) : (
                                                                <div className='edit-delete-btns'>
                                                                    <button className='edit-btn' onClick={() => handleEditarComentario(comentario)}><FontAwesomeIcon icon={faEdit} /> </button>
                                                                    <button className='delete-btn' onClick={() => handleEliminarComentario(comentario._id)}><FontAwesomeIcon icon={faTrash} /></button>
                                                                </div>
                                                            )}
                                                        </div>

                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <div className='create-comment'>
                                            <form onSubmit={handleCrearComentario}>
                                                <Anchor to={`/perfil/${publicacion?.user_id}/${publicacion?.name}`} > <img src={userData?.photo} alt="" /></Anchor>
                                                <input type="text" required className='create-comment-input' placeholder='comentar...' value={comentarioText} onChange={handleComentarioTextChange} />
                                                <button className='enviar' type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
                                            </form>
                                        </div>
                                    </div>
                                )}


                            </div>
                        ))
                    ) : (
                        <div className='AllPublicaciones'>
                            <p className='sin-sesion'>No hay publicaciones</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );


}
