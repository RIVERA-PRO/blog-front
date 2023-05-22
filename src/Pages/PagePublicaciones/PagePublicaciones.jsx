import React from 'react';
import './PagePublicaciones.css'; // Archivo CSS para los estilos del grid

import FormPublicacion from '../../Components/FormPublicacion/FormPublicacion';
import AllUsers from '../../Components/AllUsers/AllUsers';

import MyPerfil from '../../Components/MyPerfil/MyPerfil';
export default function PagePublicaciones() {
    return (
        <div className="grid-container">
            <div className="all-users">
                <MyPerfil />
            </div>
            <div className="form-publicacion">
                <FormPublicacion />
            </div>
            <div className="input-search">
                <AllUsers />
            </div>
        </div>
    );
}
