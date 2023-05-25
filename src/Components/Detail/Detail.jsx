import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Detail.css";
import Spiral from "../Spiral/Spiral";
import { faTrash, faEdit, faCheck, faPaperPlane, faTimes, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link as Anchor } from "react-router-dom";
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
        fetch(`https://dev2-lv2s.onrender.com/trabajos/${id}`, headers)
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



    /*edit-public*/
    const [reloadPublicacion, setReloadPublicacion] = useState(false);

    const [trabajo, setPublicacion] = useState([]);
    const [editingPublicacion, setEditingPublicacin] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newCategoria, setNewCategoria] = useState('');
    const [newModalidad, setNewModalidad] = useState('');
    const [newJornada, setNewJornada] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newCover_photo, setNewCover_photo] = useState('');
    const [newRequisitos, setNewRequisitos] = useState('');
    const [newUbicacion, setNewUbicacion] = useState('');
    const [newLugar, setNewLugar] = useState('');
    const [newSalario, setNewSalario] = useState('');
    const [newVacantes, setNewVacantes] = useState('');
    const [newTelefono, setNewTelefono] = useState('');
    const [newWeb, setNewWeb] = useState('');
    const [newInstagram, setNewInstagram] = useState('');
    const [newFacebook, setNewFacebook] = useState('');


    const handleEditTitle = (event) => {
        setNewTitle(event.target.value)
    }

    const handleEditCover_photo = (event) => {
        setNewCover_photo(event.target.value);
    };


    const handleEditDescription = (event) => {
        setNewDescription(event.target.value);
    };
    const handleEditCategoria = (event) => {
        setNewCategoria(event.target.value);
    };
    const handleEditModalidad = (event) => {
        setNewModalidad(event.target.value);
    };
    const handleEditJornada = (event) => {
        setNewJornada(event.target.value);
    };
    const handleEditRequisitos = (event) => {
        setNewRequisitos(event.target.value);
    };
    const handleEditUbicacion = (event) => {
        setNewUbicacion(event.target.value);
    };
    const handleEditLugar = (event) => {
        setNewLugar(event.target.value);
    };
    const handleEditSalario = (event) => {
        setNewSalario(event.target.value);
    };
    const handleEditVacantes = (event) => {
        setNewVacantes(event.target.value);
    };
    const handleEditTelefono = (event) => {
        setNewTelefono(event.target.value);
    };
    const handleEditWeb = (event) => {
        setNewWeb(event.target.value);
    };
    const handleEditInstagram = (event) => {
        setNewInstagram(event.target.value);
    };
    const handleEdiFacebook = (event) => {
        setNewFacebook(event.target.value);
    };




    const handleSaveTitle = (id) => {

        // if (newTitle.trim() === '' || newDescription.trim() === '' || newCover_photo.trim() === '') {
        //     let dataAlert = {
        //         icon: "error",
        //         title: "Los campos no pueden estar vacíos",
        //         type: "toast"
        //     };
        //     dispatch(open(dataAlert));
        //     return;
        // }


        fetch(`https://dev2-lv2s.onrender.com/trabajos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: newTitle,
                description: newDescription,
                cover_photo: newCover_photo,
                categoria: newCategoria,
                requisitos: newRequisitos,
                lugar: newLugar,
                telefono: newTelefono,
                vacantes: newVacantes,
                salario: newSalario,
                web: newWeb,
                instagram: newInstagram,
                facebook: newFacebook,
                ubicacion: newUbicacion,
                modalidad: newModalidad,
                jornada: newJornada,
            })
        })
            .then(response => response.json())
            .then(result => {
                // Actualizar el título del destino
                setPublicacion(publicacion => publicacion?.map(publicacion => publicacion?._id === id ? result?.publicacion : publicacion))
                setEditingPublicacin(null)
                let dataAlert = {
                    icon: "success",
                    title: "Trabajo editado",
                    type: "toast"
                };
                console.log(setPublicacion)
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
        fetch(`https://dev2-lv2s.onrender.com/trabajos/${id}`, {
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
                    title: "Trabajo eliminada",
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
    const [userData, setUserData] = useState(null);

    useEffect(() => {

        updateUserData();
    }, []);

    const updateUserData = () => {
        const user = localStorage.getItem('user');
        if (user) {
            setUserData(JSON.parse(user));
        }
    };


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

                            <div className="edit-delet-trabajo">
                                {producto.user_id === userData?.user_id && (
                                    <div className="edit-btn" key={producto?._id}>
                                        <div className='edit-delete-trabajos-btns'>
                                            <div className="delete-btn" onClick={() => handleDeletePublicacion(producto?._id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </div>
                                            <div className="edit-btn" onClick={() => setEditingPublicacin(producto?._id)}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </div>
                                        </div>


                                        {editingPublicacion === producto?._id ? (
                                            <div className='form-edit-public'>
                                                <input type="text" required value={newTitle} placeholder="Titulo" onChange={handleEditTitle} />
                                                <input type="url" required value={newCover_photo} placeholder="Foto Link" onChange={handleEditCover_photo} />
                                                <input type="text" required value={newDescription} placeholder="Description" onChange={handleEditDescription} />
                                                <input type="text" required value={newRequisitos} placeholder="Requisitos" onChange={handleEditRequisitos} />
                                                <input type="text" required value={newLugar} placeholder="Lugar" onChange={handleEditLugar} />
                                                <input type="number" required value={newSalario} placeholder="Salario" onChange={handleEditSalario} />
                                                <input type="number" required value={newVacantes} placeholder="Vacantes" onChange={handleEditVacantes} />
                                                <input type="number" required value={newTelefono} placeholder="Telefono" onChange={handleEditTelefono} />

                                                <input type="url" required value={newWeb} placeholder="Web" onChange={handleEditWeb} />
                                                <input type="url" required value={newInstagram} placeholder="Instagram" onChange={handleEditInstagram} />
                                                <input type="url" required value={newFacebook} placeholder="Facebook" onChange={handleEdiFacebook} />
                                                <select required value={newCategoria} onChange={handleEditCategoria}>
                                                    <option value="">Categoría</option>
                                                    <option value="">Seleccione una categoría</option>
                                                    <option value="ventas">Ventas</option>
                                                    <option value="tecnologia">Tecnología</option>
                                                    <option value="diseño">Diseño</option>
                                                    <option value="marketing">Marketing</option>
                                                    <option value="administracion">Administración</option>
                                                    <option value="finanzas">Finanzas</option>
                                                    <option value="educacion">Educación</option>
                                                    <option value="salud">Salud</option>
                                                    <option value="servicios">Servicios</option>
                                                    <option value="construccion">Construcción</option>
                                                    <option value="manufactura">Manufactura</option>
                                                    <option value="turismo">Turismo</option>
                                                    <option value="alimentacion">Alimentación</option>
                                                    <option value="medios">Medios de Comunicación</option>
                                                    <option value="logistica">Logística</option>
                                                    <option value="arte">Arte y Diseño</option>
                                                    <option value="derecho">Derecho</option>
                                                    <option value="recursos_humanos">Recursos Humanos</option>
                                                    <option value="investigacion">Investigación</option>
                                                    <option value="deportes">Deportes</option>
                                                    <option value="transporte">Transporte</option>
                                                </select>
                                                <select required value={newUbicacion} onChange={handleEditUbicacion}>
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
                                                <select required value={newModalidad} onChange={handleEditModalidad}>
                                                    <option value="">Modalidad</option>
                                                    <option value="Presencial">Presencial</option>
                                                    <option value="Hibrido">Hibrido</option>
                                                    <option value="Remoto">Remoto</option>
                                                </select>
                                                <select required value={newJornada} onChange={handleEditJornada}>
                                                    <option value="">Jornada</option>
                                                    <option value="Completa">Completa</option>
                                                    <option value="Parcial">Parcial</option>
                                                    <option value="Intensiva">Intensiva</option>
                                                    <option value="Flexible">Flexible</option>
                                                </select>

                                                <div className='cancel-save'>
                                                    <button className="save" onClick={() => handleSaveTitle(producto?._id)}>
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
                            </div>
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
