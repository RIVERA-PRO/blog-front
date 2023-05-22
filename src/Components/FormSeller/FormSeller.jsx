import React from 'react'
import './formSeller.css'
import { useRef } from 'react'
import axios from 'axios'
import { useDispatch } from "react-redux";
import alertActions from "../../Store/Alert/actions";
const { open } = alertActions;
export default function FormSeller() {
    let dispatch = useDispatch();
    let dataForm = useRef()
    const name = useRef()
    const last_name = useRef()
    const city = useRef()
    const country = useRef()
    const date = useRef()
    const photo = useRef()


    async function handleSubmit(e) {
        e.preventDefault()
        let data = {
            "name": name.current.value,
            "last_name": last_name.current.value,
            "city": city.current.value,
            "country": country.current.value,
            "date": date.current.value,
            "photo": photo.current.value
        }
        console.log(data)
        let url = 'https://dev2-lv2s.onrender.com/seller'
        let token = localStorage.getItem('token')
        let headers = { 'Authorization': `Bearer ${token}` }
        try {
            await axios.post(url, data, { headers: headers })
            console.log('Seller creado')
            let dataAlert = {
                icon: "success",
                title: "Seller Create",
                type: "toast"
            };
            dispatch(open(dataAlert));
            e.target.reset()
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
        <div className='formSeller'>
            <form onSubmit={handleSubmit} className='sellerFormulario'>
                <div className='inputs'>
                    <label >Nombre</label>
                    <input type="text" placeholder='Nombre' ref={name} />
                </div>
                <div className='inputs'>
                    <label >Apellido</label>
                    <input type="text" placeholder='Apellido' ref={last_name} />
                </div>
                <div className='inputs'>
                    <label >Ciudad</label>
                    <input type="text" placeholder='Ciudad' ref={city} />
                </div>
                <div className='inputs'>
                    <label >Pais</label>
                    <input type="text" placeholder='Pais' ref={country} />
                </div>
                <div className='inputs'>
                    <label >Fecha de creacion</label>
                    <input type="date" ref={date} />
                </div>
                <div className='inputs'>
                    <label >Tu Foto</label>
                    <input type="text" placeholder='Tu Foto url' ref={photo} />
                </div>
                <button>Enviar</button>
            </form>
        </div>
    )
}
