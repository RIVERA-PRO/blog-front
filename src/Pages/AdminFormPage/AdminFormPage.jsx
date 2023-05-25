import React, { useState } from 'react';
import FormPublicacion from '../../Components/FormPublicacion/FormPublicacion';

import Admin from '../../Components/Admin/Admin';

import './AdminFormPage.css';
import { faEdit, faCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actionUser from '../../Store/GetUser/Actions';
import BtnLog from '../../Components/btnLog/BtnLog';

const { oneUser } = actionUser;

export default function AdminFormPage() {
    const [showForm, setShowForm] = useState(true);
    const [showSellerForm, setShowSellerForm] = useState(false);

    const dispatch = useDispatch();
    let token = localStorage.getItem('token')
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.user) {
            dispatch(oneUser({ user_id: user.user }));
        }
    }, [dispatch]);

    const idUser = useSelector((store) => store.getUser.user[0]);
    console.log(idUser)

    const handleShowForm = () => {
        setShowForm(true);
        setShowSellerForm(false);
    };

    const handleShowAdmin = () => {
        setShowForm(false);
        setShowSellerForm(false);
    };

    const handleShowSellerForm = () => {
        setShowForm(false);
        setShowSellerForm(true);
    };

    return (
        token && idUser?.is_admin ? (
            <div className="page-container">
                <div className="menu-container">
                    <div className="btnss">
                        <button className="menu-button" onClick={handleShowForm}>
                            <FontAwesomeIcon className='icon' icon={faEdit} /> Publicaciones
                        </button>

                    </div>
                </div>
                <div className="content-container">
                    {showForm &&
                        <Admin />}
                </div>
            </div>) : (<BtnLog />)
    );
}
