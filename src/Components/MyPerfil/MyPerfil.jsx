import React, { useState, useEffect } from 'react'
import Logout from '../Logout/Logout'
import { Link as Anchor } from "react-router-dom";
import './MyPerfil.css'
export default function MyPerfil() {
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

        <div className='MyPerfilContainer'>
            {userData ? (
                <div className='MyPerfilInfo'>


                    <img className='Mybanner' src={userData.banner} alt="" />
                    <div className='MyText'>
                        <Anchor to={`/perfil/${userData.user_id}/${userData.name}`} >  <img src={userData.photo} alt="User Avatar" /></Anchor>


                        <Anchor to={`/perfil/${userData.user_id}/${userData.name}`} > {userData.name.slice(0, 20)}</Anchor>
                        <h6>{userData.profile}</h6>
                    </div>


                </div>
            ) : (
                <p className='sin-sesion'>Inicia sesión para ver tu perfil</p>
            )}
        </div>

    )
}
