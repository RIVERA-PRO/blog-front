import React from 'react'
import { Link as Anchor, } from "react-router-dom";
import './Footer.css'

export default function FooterC() {
    return (
        <div className='contain-footer '>

            <div className='Footer-contain '>

                <div className='Footer-links '>
                    <div className='logo'>
                        <img src="../../../img/logoF2.png" alt="logo" />
                    </div>
                    <div className='logo2'>
                        <img src="../../../img/logoF.png" alt="logo" />
                    </div>

                    <Anchor to={`/`} >indiojuan2012.jr@gmail.com</Anchor>
                    <Anchor to={`/`} >+54 3875683101</Anchor>
                    <Anchor to={`/`} > Salta, Argentina</Anchor>

                </div>
                <div className='Footer-links'>
                    <h4>Links</h4>
                    <Anchor to={`/`} >Inicio</Anchor>
                    <Anchor to={`/`} >Blog</Anchor>
                    <Anchor to={`/`} >Tols</Anchor>
                    <Anchor to={`/`} >Docs</Anchor>
                </div>
                <div className='Footer-links'>
                    <h4>Empleos</h4>
                    <Anchor to={`/`} >Diseñador</Anchor>
                    <Anchor to={`/`} >Desarrollador</Anchor>
                    <Anchor to={`/`} >Ingeniero</Anchor>
                    <Anchor to={`/`} >Gerente</Anchor>
                </div>
                <div className='Footer-links'>
                    <h4>Categorias</h4>
                    <Anchor to={`/`} >Tecnologia</Anchor>
                    <Anchor to={`/`} >Educacion</Anchor>
                    <Anchor to={`/`} >Administracion</Anchor>
                    <Anchor to={`/`} >Ventas</Anchor>
                </div>

            </div>

            <hr />

            <div className='footer-footer'>
                <div className="redes-socialesf">

                    <Anchor to={`https://www.instagram.com/juan_rivera_de_ellas/`}><i className='fa fa-instagram'></i></Anchor>
                    <Anchor to={`https://www.linkedin.com/in/juan-rivera-9ba866215/`}> <i className='fa fa-linkedin'></i></Anchor>
                    <Anchor to={`https://github.com/RIVERA-PRO`}> <i className='fa fa-github'></i></Anchor>
                </div>
                <p>Copyright © 2023 JR DEV | Reservados todos los derechos</p>
            </div>
        </div>
    )
}
