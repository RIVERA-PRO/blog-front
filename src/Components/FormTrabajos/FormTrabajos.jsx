import React from 'react'
import { useRef } from 'react'
import axios from 'axios'
import { useDispatch } from "react-redux";
import alertActions from "../../Store/Alert/actions";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './FormTrabajos.css'
import { useNavigate } from 'react-router-dom';

const { open } = alertActions;

export default function FormTrabajos() {
    const [categories, setCategories] = useState([]);
    let token = localStorage.getItem('token')
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }
    const navigate = useNavigate();




    let dispatch = useDispatch();
    let dataForm = useRef()
    const title = useRef()
    const cover_photo = useRef()
    const category_id = useRef()
    const { seller_id } = useParams()
    const { user_id } = useParams()
    const categoria = useRef()
    const vacantes = useRef()
    const salario = useRef()

    const description = useRef()
    const lugar = useRef()
    const country = useRef()

    const web = useRef()
    const instagram = useRef()
    const facebook = useRef()
    const telefono = useRef()
    const requisitos = useRef()


    function convertToNumber(value) {
        return parseFloat(value.trim().replace(',', ''));
    }
    let user = JSON.parse(localStorage.getItem('user'));
    let userId = user?.user_id;
    let nameUser = user?.name
    let mail = user?.mail
    let photo = user?.photo
    console.log(userId)
    const jornadas = [
        "Completa",
        "Parcial",
        "Intensiva",
        "Flexible",
    ];
    const [selectJornada, selectJornada2] = useState('');
    const jornadaRef = useRef(null);

    const handleJornada = (e) => {
        selectJornada2(e.target.value);
    };

    const modalidades = [
        "Presencial",
        "Hibrido",
        "Remoto",
    ];
    const [selectModalidad, selectModalidad2] = useState('');
    const modalidadRef = useRef(null);

    const handleModalidad = (e) => {
        selectModalidad2(e.target.value);
    };
    const SaltaDepartments = [
        "Otros",
        "Anta",
        "Cachi",
        "Cafayate",
        "Salta",
        "Cerrillos",
        "Chicoana",
        "General Güemes",
        "Guachipas",
        "Iruya",
        "La Caldera",
        "La Candelaria",
        "La Poma",
        "La Viña",
        "Los Andes",
        "Metán",
        "Molinos",
        "Orán",
        "Rivadavia",
        "Rosario de la Frontera",
        "Rosario de Lerma",
        "San Carlos",
        "San Martín",
        "Santa Victoria"
    ];
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const countryRef = useRef(null);

    const handleSelect = (e) => {
        setSelectedDepartment(e.target.value);
    };

    async function handleSubmit(e) {
        e.preventDefault()
        let data = {
            "title": title.current.value,
            "description": description.current.value,
            "lugar": lugar.current.value,
            "ubicacion": countryRef.current.value,
            vacantes: convertToNumber(vacantes.current.value),
            salario: convertToNumber(salario.current.value),


            "user_id": userId,

            "categoria": categoria.current.value,
            "name": nameUser,
            "photo": photo,
            "mail": mail,
            "web": web.current.value,
            "instagram": instagram.current.value,
            "facebook": facebook.current.value,
            "telefono": telefono.current.value,
            "requisitos": requisitos.current.value,
            "jornada": jornadaRef.current.value,
            "modalidad": modalidadRef.current.value,

        }
        console.log(data)
        let url = 'http://localhost:8080/trabajos'
        let token = localStorage.getItem('token')
        let headers = { 'Authorization': `Bearer ${token}` }
        try {
            await axios.post(url, data, { headers: headers })

            let dataAlert = {
                icon: "success",
                title: "Trabajo creado",
                type: "toast"
            };
            dispatch(open(dataAlert));
            e.target.reset()
            navigate('/trabajos');
        }
        catch (err) {
            console.log(err)
            let dataAlert = {
                icon: "error",
                title: err,
                type: "toast"
            };
            dispatch(open(dataAlert));
        }


    }

    return (
        <div className='formTrabajos'>
            <form onSubmit={handleSubmit} >

                <div className='contain-inputs'>
                    <p>Crear un trabajo</p>

                    <div className='inputs-flex'>
                        <div>
                            <label >Titulo</label>
                            <input type="text" placeholder='titulo' required ref={title} />
                        </div>
                        <div>
                            <label>Categoria</label>
                            <input type="text" placeholder='categoria' required ref={categoria} />
                        </div>
                    </div>

                    <div className='inputs'>
                        <label >Description</label>
                        <input type="text" placeholder='description' required ref={description} />

                    </div>


                    <div className='inputs-flex'>
                        <div>
                            <label >Requisitos</label>
                            <input type="text" placeholder='requisitos' required ref={requisitos} />
                        </div>
                        <div>
                            <label >Lugar </label>
                            <input type="text" placeholder='lugar' required ref={lugar} />
                        </div>
                    </div>

                    <div className='inputs-flex'>
                        <div className='inputs-flex-select'>
                            <label htmlFor="country">Departamento</label>
                            <select id="country" value={selectedDepartment} onChange={handleSelect} required ref={countryRef}>
                                <option value="">Departamento</option>
                                {SaltaDepartments.map((department) => (
                                    <option key={department} value={department}>
                                        {department}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='inputs-flex-select'>
                            <label htmlFor="jornada">Jornada</label>
                            <select id="jornada" value={selectJornada} onChange={handleJornada} required ref={jornadaRef}>
                                <option value="">Jornada</option>
                                {jornadas.map((jornad) => (
                                    <option key={jornad} value={jornad}>
                                        {jornad}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='inputs-flex-select'>
                            <label htmlFor="modalidad">Modalidad</label>
                            <select id="modalidad" value={selectModalidad} onChange={handleModalidad} required ref={modalidadRef}>
                                <option value="">Modalidad</option>
                                {modalidades.map((modalid) => (
                                    <option key={modalid} value={modalid}>
                                        {modalid}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>



                    <div className='inputs-flex'>
                        <div >
                            <label >Salario</label>
                            <input type="number" placeholder='salario' required ref={salario} />
                        </div>
                        <div >
                            <label >Vacantes</label>
                            <input type="number" placeholder='vacantes' required ref={vacantes} />
                        </div>
                    </div>






                    <div className='inputs-flex'>
                        <div>
                            <label>Telefono</label>
                            <input type="number" placeholder='telefono ' required ref={telefono} />
                        </div>


                        <div>
                            <label> Web (opcional)</label>
                            <input type="text" placeholder='web link' ref={web} />
                        </div>
                    </div>
                    <div className='inputs-flex'>
                        <div>
                            <label> facebook (opcional)</label>
                            <input type="text" placeholder='facebook link' ref={facebook} />
                        </div>
                        <div>
                            <label> instagram (opcional)</label>
                            <input type="text" placeholder='instagram link' ref={instagram} />
                        </div>
                    </div>


                    <button>Crear</button>
                </div>





            </form>
        </div>
    )
}
