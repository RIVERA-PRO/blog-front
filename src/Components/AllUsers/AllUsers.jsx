import React, { useState, useEffect } from 'react';
import './AllUsers.css';
import Spiral from '../Spiral/Spiral';
import { Link as Anchor } from "react-router-dom";
import Swal from 'sweetalert2';

export default function AllUsers() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        setTimeout(() => {
            fetch('http://localhost:8080/users')
                .then(response => response.json())
                .then(data => {
                    setUsers(data);
                    console.log(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error al obtener los usuarios:', error);
                    setLoading(false);
                    showErrorAlert();
                });
        }, 4000); // Simular tiempo de carga de 2 segundos
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
        <div>
            {loading ? (
                <Spiral />
            ) : (
                <div className="user-list">
                    {users.users && users.users.map(user => (
                        <div key={user._id}>
                            <Anchor to={`/perfil/${user._id}/${user.name}`} >{user.name}</Anchor>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
