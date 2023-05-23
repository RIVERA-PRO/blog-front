import React from 'react';
import './PagePublicaciones.css';
import FormPublicacion from '../../Components/FormPublicacion/FormPublicacion';
import AllUsers from '../../Components/AllUsers/AllUsers';
import MyPerfil from '../../Components/MyPerfil/MyPerfil';
import TrabajosHome from '../../Components/TrabajosHome/TrabajosHome';
export default function PagePublicaciones() {
    return (
        <div className="grid-container">
            <div className="all-users">
                <MyPerfil />
            </div>
            <div className="form-publicacion">

                <FormPublicacion />
            </div>
            <div className="usersAll-trabajos">
                <AllUsers />
                {/* <TrabajosHome /> */}

            </div>
        </div>
    );
}
