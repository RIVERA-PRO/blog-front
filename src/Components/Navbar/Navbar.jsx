import React, { useState, useEffect } from 'react'
import './Navbar.css'

import { Link as Anchor, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import LogIn from '../LogIn/LogIn';
import Register from '../Register/Register';
import UserInfo from '../InfoUser/InfoUser';
import { useDispatch, useSelector } from 'react-redux';
import actionUser from '../../Store/GetUser/Actions';
import InputSearchs from '../InputSerach/InputSearchs';
const { oneUser } = actionUser;
export default function Navbar() {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false);
    let [modalUser, setModalUser] = useState(false);
    let [modalUserOption, setModalUserOption] = useState('login');
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.user_id) {
            dispatch(oneUser({ user_id: user.user_id }));
        }
    }, [dispatch]);

    const idUser = useSelector((store) => store.getUser.user[0]);
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };
    const handleModalUser = () => {
        setModalUser(!modalUser);
    }; //Funcion renderiza Modal 'user'
    const handleModalUserOption = () => {
        setModalUserOption(modalUserOption === 'register' ? 'login' : 'register');
    }; //Funcion renderiza el modal 'register' o 'login'

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
        <header>
            <nav className={scrolled ? "navbar scrolled" : "navbar"}>
                <div className='logo'>
                    <Anchor to={`/`} ><img src="../../../img/logo2.png" alt="logo" /></Anchor>

                </div>
                <div className='logo2'>
                    <Anchor to={`/`} > <img src="../../../img/logo1.png" alt="logo" /></Anchor>

                </div>
                <div className='logonav'>
                    <Anchor to={`/`} >  <img src="../../../img/logonav.png" alt="logo" /></Anchor>

                </div>

                <div className={`nav_items ${isOpen && "open"}`} >

                    <div className="cerrar-nav" onClick={() => setIsOpen(!isOpen)}>
                        x
                    </div>

                    <div className='logo-nav'>
                        <Anchor to={`/`} >   <img src="../../../img/logo1.png" alt="logo" /></Anchor>

                    </div>


                    <div>

                        {userData ? (
                            <div className='userInfo-nav2' onClick={handleModalUser} >
                                <img src={userData.photo} alt="User Avatar" />
                                <p><FontAwesomeIcon icon={faSignOutAlt} /> </p>

                            </div>
                        ) : (
                            <div className='userInfo-nav2-ini' onClick={handleModalUser} >

                                <p>Ingresar <FontAwesomeIcon icon={faSignOutAlt} /></p>
                            </div>
                        )}
                        <div className='input-enlaces'>
                            <div>
                                {userData ? (
                                    idUser?.is_admin ? (
                                        <div className='enlaces'>
                                            <Anchor to={`/`} >Inico</Anchor>
                                            <Anchor to={`/publicaciones/ASJDH812789SA7DASUEHD81273`} >Publicaciones</Anchor>
                                            <Anchor to={`/new/destinos`} >Admin</Anchor>
                                        </div>
                                    ) : (
                                        <div className='enlaces'>
                                            <Anchor to={`/`} >Inico</Anchor>
                                            <Anchor to={`/publicaciones/ASJDH812789SA7DASUEHD81273`} >Publicaciones</Anchor>
                                        </div>
                                    )) : (
                                    <div className='enlaces'>
                                        <Anchor to={`/`} >Home</Anchor>
                                    </div>
                                )}
                            </div>

                            <div className='inputSearch-nav'>
                                <InputSearchs />
                            </div>
                        </div>


                    </div>

                </div>
                <div className='inputSearch-nav2'>
                    <InputSearchs />
                </div>
                {userData ? (
                    <div className='userInfo-nav' onClick={handleModalUser} >
                        <img src={userData.photo} alt="User Avatar" />
                        <p><FontAwesomeIcon icon={faSignOutAlt} /></p>
                    </div>
                ) : (
                    <div className='icons-nav' onClick={handleModalUser}>
                        <p><FontAwesomeIcon icon={faUser} /> Ingresar </p>
                    </div>
                )}

                <div className={`nav_toggle  ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>




                {modalUser && (
                    <div className="modal_content">
                        <div className="modal-nav">
                            <div className="cerrar-modal" onClick={handleModalUser}>x</div>

                            <UserInfo />
                            {modalUserOption === 'register' ? <Register /> : <LogIn />}
                            <p className='loginText'>{modalUserOption === 'register' ? '¿Ya tienes una cuenta? ' : '¿No tienes una cuenta? '}
                                <Anchor id='login' onClick={handleModalUserOption}>
                                    {modalUserOption === 'register' ? 'Ingresar' : 'Registrarse'}
                                </Anchor>
                            </p>

                        </div>
                    </div>
                )}
            </nav>


        </header>
    );
}
