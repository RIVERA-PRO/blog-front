import React, { useState, useEffect } from 'react';
import './AllUsers.css';
import Spiral from '../Spiral/Spiral';
import { Link as Anchor } from "react-router-dom";
import Swal from 'sweetalert2';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TrabajosHome from '../TrabajosHome/TrabajosHome';
export default function AllUsers() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        setTimeout(() => {
            fetch('https://dev2-lv2s.onrender.com/users')
                .then(response => response.json())
                .then(data => {
                    // Randomly select 3 users
                    const randomUsers = getRandomUsers(data.users, 3);
                    setUsers(randomUsers);
                    console.log(randomUsers);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error al obtener los usuarios:', error);
                    setLoading(false);
                    showErrorAlert();
                });
        }, 2000); // Simular tiempo de carga de 2 segundos
    };

    const getRandomUsers = (users, count) => {
        const shuffledUsers = users.sort(() => 0.5 - Math.random());
        return shuffledUsers.slice(0, count);
    };

    const showErrorAlert = () => {
        Swal.fire({
            title: '¡Ops!',
            text: 'Ha ocurrido un error en la petición',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    };



    return (
        <div className='users-trabajos'>
            <div className='allUser-contain'>
                {loading ? (
                    <div className='user-list'>
                        <Spiral />
                    </div>
                ) : (
                    <div>
                        <h5>Usuarios que podrias conocer</h5>
                        {users.map(user => (
                            <div key={user._id} className='user-list'>
                                <Anchor to={`/perfil/${user._id}/${user.name}`} >
                                    {user.photo ? (
                                        <img src={user.photo} alt={user.name} />
                                    ) : (
                                        <img src="https://i.postimg.cc/fyJsspq8/image.png" alt={user.name} />
                                    )}
                                </Anchor>
                                <div className='user-list-text'>
                                    <Anchor to={`/perfil/${user._id}/${user.name}`} >{user.name?.slice(0, 15)}</Anchor>
                                    <p>{user.profile?.slice(0, 30)}</p>
                                </div>
                            </div>
                        ))}
                        <Anchor to={`/usuarios`} >Ver más usuarios  <FontAwesomeIcon icon={faSignOutAlt} /></Anchor>
                    </div>
                )}

            </div>
            <TrabajosHome />

        </div >
    );
}
