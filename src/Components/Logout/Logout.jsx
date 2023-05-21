import React from 'react';
import './logout.css'
import { useNavigate } from 'react-router';
import { useDispatch } from "react-redux";
import alertActions from "../../Store/Alert/actions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const { open } = alertActions;

export default function LogoutButton() {
  let dispatch = useDispatch();
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('carrito');
    setInterval(() => window.location.href = '/')
    let dataAlert = {
      icon: "success",
      title: "Sesión cerrada con éxito",
      type: "toast"
    };
    dispatch(open(dataAlert));
  }

  return (
    <button className='logoutBtn' onClick={handleLogout}>  <FontAwesomeIcon icon={faSignOutAlt} />Salir</button>
  )
}
