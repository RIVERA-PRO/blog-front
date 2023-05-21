import React, { useState, useEffect } from 'react'
import './infoUser.css'
import Logout from '../Logout/Logout'
import { Link as Anchor } from "react-router-dom";
function ProfilePage({ handleLogout }) {
  const [userData, setUserData] = useState(null);

  const updateUserData = () => {
    const user = localStorage.getItem('user');
    if (user) {
      setUserData(JSON.parse(user));
    }
  };

  // Llamar a la función updateUserData cuando el componente se monte
  useEffect(() => {
    updateUserData();
  }, []);

  useEffect(() => {
    const formRegisterContain = document.querySelector('.form-register-contain ');
    if (userData) {
      formRegisterContain.style.display = 'none';
    } else {
      formRegisterContain.style.display = 'flex';
    }
  }, [userData]);

  useEffect(() => {
    const loginText = document.querySelector('.loginText');
    if (userData) {
      loginText.style.display = 'none';
    } else {
      loginText.style.display = 'block';
    }
  }, [userData]);



  // Actualizar el estado de userData cuando el usuario inicie sesión
  const handleLogin = () => {
    updateUserData();
  };

  return (
    <div className='userInfoContainer'>
      {userData ? (
        <div className='userInfo'>
          <h3>Tu perfil</h3>
          <div className='info'>
            <img src={userData.photo} alt="User Avatar" />
            <div>
              <h3>{userData.name}</h3>
              <p>{userData.mail}</p>
            </div>
            <Anchor to={`/perfil/${userData.user_id}/${userData.name}`} > ver</Anchor>
          </div>
          <Logout onClick={handleLogout} />
        </div>
      ) : (
        <p className='loginText'>Inicia sesión para ver tu perfil</p>
      )}
    </div>
  );
}

export default ProfilePage;