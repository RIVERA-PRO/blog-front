import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Perfil.css';
import Spiral from '../Spiral/Spiral';
import banner from '../../img/banner.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import alertActions from '../../Store/Alert/actions';
import axios from 'axios';
import Swal from 'sweetalert2';
const { open } = alertActions;
export default function Perfil() {
    const params = useParams();

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    let [editModal, setEditModal] = useState(false);
    let [editMode, setEditMode] = useState('info');
    let [textoEdit, setTextoEdit] = useState({})
    let [idEdit, setIdEdit] = useState()
    const [publicaciones, setPublicaciones] = useState([]);
    const [seguidores, setSeguidores] = useState(null);
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [hasClicked, setHasClicked] = useState(false);
    const [hasFollowed, setHasFollowed] = useState(false);
    const [comentarios, setComentarios] = useState([]);

    let token = localStorage.getItem('token');
    let headers = { headers: { 'Authorization': `Bearer ${token}` } };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetch(`http://localhost:8080/users/${id}`, headers)
                .then(response => response.json())
                .then(data => {
                    setUser(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error al obtener los datos del usuario:', error);
                    setLoading(false);
                });
        }, 5000);
        return () => clearTimeout(timer);
    }, [id]);

    const handleEmailClick = (email) => {
        window.location.href = `mailto:${email}`;
    };



    const renderEditButton = () => {
        if (currentUser && user && currentUser.user_id === user.user[0]._id) {
            return (
                <button className="edit-button" onClick={() => handleModalEdit(user._id, user.name)}>
                    <FontAwesomeIcon icon={faPencilAlt} />

                </button>
            );
        }
        return null;

    };
    const handleModalEdit = (id) => {
        setEditModal(!editModal)
        setIdEdit(id)
    }
    const showErrorAlert = () => {
        Swal.fire({
            title: '¡Ops!',
            text: 'Ha ocurrido un error en la petición',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    };

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/users/${id}`, headers);
            const data = response.data;
            setUser(data);
            setSeguidores(data.user[0].seguidores);
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
            showErrorAlert();
        }
    };
    const handleEditBasicInfo = async (event) => {
        event.preventDefault();

        try {
            const { data } = await axios.put(`http://localhost:8080/users/${id}`, {
                name: textoEdit.name || user.user[0].name,
                photo: textoEdit.photo || user.user[0].photo,
                profile: textoEdit.profile || user.user[0].profile,
                cv: textoEdit.cv || user.user[0].cv,
                banner: textoEdit.banner || user.user[0].banner,
            }, headers);

            let dataAlert = {
                icon: 'success',
                title: "Información básica editada exitosamente:",
                type: 'toast',
            };
            dispatch(open(dataAlert));

            await fetchUserData();
        } catch (error) {
            let dataAlert = {
                icon: 'error',
                title: "Error al editar la información básica:",
                error,
                type: 'toast',
            };
            dispatch(open(dataAlert));
        }

        setEditModal(false);
    };

    const handleEditPassword = async (event) => {
        event.preventDefault();

        try {
            const { data } = await axios.put(`http://localhost:8080/users/${id}`, {
                password: textoEdit.password || user.user[0].password,
            }, headers);

            let dataAlert = {
                icon: 'success',
                title: "Contraseña editada exitosamente:",
                type: 'toast',
            };
            dispatch(open(dataAlert));

            await fetchUserData();
            setEditModal(false);
        } catch (error) {
            let dataAlert = {
                icon: 'error',
                title: "Error al editar la contraseña:",
                error,
                type: 'toast',
            };
            dispatch(open(dataAlert));
        }
    };

    const handleInputChange = (e) => {
        setTextoEdit({
            ...textoEdit,
            [e.target.name]: e.target.value
        });
    };


    useEffect(() => {
        const fetchPublicaciones = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/publicacion/`, headers);

                setPublicaciones(response.data.publicaciones);
                console.log(response.data.publicaciones)
            } catch (error) {
                console.error('Error al obtener las publicaciones del usuario:', error);
            }
        };

        const timer = setTimeout(() => {
            fetchPublicaciones();
        }, 3000);

        return () => clearTimeout(timer);
    }, [id]);

    useEffect(() => {
        fetchUserData();
    }, [id]);
    useEffect(() => {
        const hasClicked = localStorage.getItem('hasClicked');
        if (hasClicked === 'true') {
            setHasClicked(true);
        }
    }, []);

    useEffect(() => {
        const storedSeguidores = localStorage.getItem('seguidores');
        const storedHasFollowed = localStorage.getItem('hasFollowed');

        if (storedSeguidores) {
            setSeguidores(parseInt(storedSeguidores, 10));
        }

        if (storedHasFollowed) {
            setHasFollowed(storedHasFollowed === 'true');
        }
    }, []);
    const handleSeguidoresClick = async () => {
        try {
            let updatedSeguidores = seguidores;

            if (!hasFollowed) {
                updatedSeguidores += 1;
                let dataAlert = {
                    icon: 'success',
                    title: `Sigues a ${user.user[0].name}`,
                    type: 'toast',
                };
                dispatch(open(dataAlert));
            } else {
                updatedSeguidores -= 1;
                let dataAlert = {
                    icon: 'success',
                    title: `Dejaste de seguir a ${user.user[0].name}`,
                    type: 'toast',
                };
                dispatch(open(dataAlert));
            }

            await axios.put(
                `http://localhost:8080/users/${id}`,
                { seguidores: updatedSeguidores },
                headers
            );

            setSeguidores(updatedSeguidores);
            setHasFollowed(!hasFollowed);

            localStorage.setItem('seguidores', updatedSeguidores);
            localStorage.setItem('hasFollowed', !hasFollowed);
        } catch (error) {
            console.error('Error al modificar el número de seguidores:', error);
        }
    };

    const fetchComentarios = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/comments?chapter_id=${params.publicacion_id}`, headers);

            setComentarios(response.data.comments);
            console.log(response.data.comments[3].publicacion_id)
        } catch (error) {
            console.error('Error al obtener los comentarios:', error);
        }
    };
    useEffect(() => {
        fetchComentarios();
    }, []);



    return (
        <div>
            {loading ? (
                <div className='perfil-container'>
                    <Spiral />
                </div>
            ) : (
                <div className="perfil-container">
                    {user && user.user.map((userData, index) => (
                        <div key={index} className="perfil">
                            <div className="perfil-fondo">
                                {userData.banner === "" ? (
                                    <img className="banner" src={banner} alt="" />
                                ) : (
                                    <img className="banner" src={userData?.banner} alt="" />
                                )}
                                <div>
                                    <img className='perfil-photo' src={userData?.photo} alt={userData?.name} />
                                    <div className='text-btn'>
                                        <div className='perfil-text'>
                                            <h3>{userData?.name}</h3>
                                            <p>{userData?.profile}</p>
                                            <p><a href={`mailto:${userData?.mail}`} onClick={() => handleEmailClick(userData?.mail)}>{userData?.mail}</a></p>
                                            {userData.cv && (
                                                <p>
                                                    <a href={userData?.cv} target="_blank" rel="noopener noreferrer">
                                                        Descargar CV
                                                    </a>
                                                </p>
                                            )}
                                            {currentUser && currentUser?.user_id === userData?._id ? (
                                                <button className='seguidores'>
                                                    {seguidores} seguidores
                                                </button>
                                            ) : (
                                                <button className='seguidores' onClick={handleSeguidoresClick} disabled={hasClicked}>
                                                    {hasClicked ? `Ya seguiste` : `${seguidores} seguidores`}
                                                </button>
                                            )}
                                        </div>
                                        {renderEditButton()}
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                    {editModal && (
                        <div className='modal-sub'>
                            <div className="submodal">
                                <div className='title-cerrar'>
                                    <div><p>{editMode === 'info' ? 'Información básica' : 'Información Sensible'}</p></div>
                                    <div className="cerrar" onClick={() => setEditModal(false)}>x</div>
                                </div>
                                {editMode === 'info' ? (
                                    <form onSubmit={handleEditBasicInfo} className="formEdit">
                                        <label htmlFor="">Nombre</label>
                                        <input type="text" name="name" placeholder="Nombre" className='input-edit' value={textoEdit.name || ''} onChange={handleInputChange} />
                                        <label htmlFor="">Foto</label>
                                        <input type="text" name="photo" placeholder="Foto Url" className='input-edit' value={textoEdit.photo || ''} onChange={handleInputChange} />
                                        <label htmlFor="">Banner</label>
                                        <input type="text" name="banner" placeholder="Banner Url" className='input-edit' value={textoEdit.banner || ''} onChange={handleInputChange} />

                                        <label htmlFor="">Profesión</label>
                                        <input type="text" name="profile" placeholder="Profesión" className='input-edit' value={textoEdit.profile || ''} onChange={handleInputChange} />
                                        <label htmlFor="">CV</label>
                                        <input type="text" name="cv" placeholder="CV Url" className='input-edit' value={textoEdit.cv || ''} onChange={handleInputChange} />
                                        <button type="submit">Guardar</button>
                                        <button className='edit-btn-cambio' onClick={() => setEditMode('password')}>Ir a Información Sensible <FontAwesomeIcon icon={faSignOutAlt} /></button>
                                    </form>
                                ) : (
                                    <form onSubmit={handleEditPassword} className="formEdit">
                                        <label htmlFor="">Nueva Contraseña</label>
                                        <input type="password" name="password" placeholder="Nueva Contraseña" required className='input-edit' value={textoEdit.password || ''} onChange={handleInputChange} />
                                        <button type="submit">Guardar</button>
                                        <button className='edit-btn-cambio' onClick={() => setEditMode('info')}>Ir a Información Básica <FontAwesomeIcon icon={faSignOutAlt} /></button>
                                    </form>
                                )}
                            </div>
                        </div>
                    )}

                    <div>
                        {loading ? (
                            <div className='perfil-publicacion'>
                                <Spiral />
                            </div>
                        ) : (
                            <div className="perfil-publicacion">

                                {publicaciones
                                    .filter((publicacion) => publicacion.user_id === id)
                                    .map((publicacion) => (
                                        <div key={publicacion.id} className='publicacion'>

                                            <div className='name-photo'>
                                                <img src={publicacion.photo} alt="" />
                                                <div>
                                                    <p>{publicacion.name}</p>
                                                    <p>{new Date(publicacion.createdAt).toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <div className='title-cover_photo'>
                                                <p>{publicacion.title}</p>
                                                <img src={publicacion.cover_photo} alt="" />
                                            </div>

                                            <div>
                                                {comentarios
                                                    .filter((comentario) => comentario.publicacion_id === publicacion._id)
                                                    .map((comentario) => (
                                                        <div key={comentario._id}>
                                                            <p>{comentario.text}</p>
                                                            <img src={comentario.user_id.photo} alt={comentario.user_id.name} />
                                                            <p>{comentario.user_id.name}</p>
                                                            <p>{comentario.user_id.publicacion_id}</p>
                                                        </div>
                                                    ))}


                                            </div>
                                        </div>
                                    ))}

                            </div>
                        )}
                    </div>

                </div>


            )}
        </div>
    );
}
