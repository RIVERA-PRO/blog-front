import React from 'react'
import './Register.css'
import { useRef, useEffect } from "react";
import axios from 'axios'
import { useDispatch } from "react-redux";
import alertActions from "../../Store/Alert/actions";
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const { open } = alertActions;


export default function Register() {
  const navigate = useNavigate();

  let dispatch = useDispatch();
  let dataForm = useRef()


  async function handleSubmit(e) {
    e.preventDefault()

    let formInputs = []

    Object.values(dataForm.current.elements).forEach(e => {
      if (e.nodeName === 'INPUT' && e.name) {
        formInputs.push(e)
      }
    })
    formInputs.pop()
    let data = {
      [formInputs[0].name]: formInputs[0].value,
      [formInputs[1].name]: formInputs[1].value,
      [formInputs[2].name]: formInputs[2].value,
      [formInputs[3].name]: formInputs[3].value,
    }

    let url = 'https://dev2-lv2s.onrender.com/users/signup'
    try {
      await axios.post(url, data)
      let dataAlert = {
        icon: "success",
        title: "Registro exitoso",
        type: "toast"
      };
      dispatch(open(dataAlert));
      dataForm.current.reset()
    } catch (error) {
      console.error(error);
      let errorMessage = '';
      if (error.response && error.response.data && error.response.data.message) {
        if (typeof error.response.data.message === 'string') {
          errorMessage = error.response.data.message;
        } else {
          errorMessage = error.response.data.message.join(' ');
        }
      } else {
        errorMessage = 'Se produjo un error al procesar la solicitud.';
      }
      console.log(errorMessage);

      let dataAlert = {
        icon: "error",
        title: errorMessage,
        text: errorMessage,
        type: "toast",
      };
      dispatch(open(dataAlert));
    }
  }
  const clientID =
    "901329466549-imbkgdg5udchc3i7a2so08b42avdnqb2.apps.googleusercontent.com";

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = async (response) => {
    console.log(response);
    try {
      const { name, email, imageUrl, googleId } = response.profileObj;

      const data = {
        name: name,
        mail: email,
        photo: imageUrl,
        password: googleId,
      };
      console.log(data.name);
      const url = "https://dev2-lv2s.onrender.com/users/signup";
      await axios.post(url, data);
      let dataAlert = {
        icon: "success",
        title: "Registro exitoso",
        type: "toast"
      };
      dispatch(open(dataAlert));
      dataForm.current.reset();
      navigate("/");
    } catch (error) {
      console.error(error);
      let errorMessage = "";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        if (typeof error.response.data.message === "string") {
          errorMessage = error.response.data.message;
        } else {
          errorMessage = error.response.data.message.join(" ");
        }
      } else {
        errorMessage = "Se produjo un error al procesar la solicitud.";
      }
      console.log(errorMessage);

      let dataAlert = {
        icon: "error",
        title: errorMessage,
        text: errorMessage,
        type: "toast",
      };
      dispatch(open(dataAlert));
    }
  };

  const onFailure = () => {
    console.log("Something went wrong");
  };


  return (
    <div className='form-register-contain'>
      <form action="" className='form-register' onSubmit={handleSubmit} ref={dataForm}>
        <h4>Registrarse</h4>
        <label htmlFor="">Nombre</label>
        <input type="text" placeholder=' Nombre' name='name' id='name' />
        <label htmlFor="">Email</label>
        <input type="email" placeholder='Email' name='mail' id='mail' />
        <label htmlFor="">Foto</label>
        <input type="text" placeholder='Foto url' name='photo' id='photo' />
        <label htmlFor="">Contraseña</label>
        <input type="password" placeholder='Contraseña' name='password' id='password' />
        <div className='enviar'>
          <input type='submit'></input>
        </div>
        <GoogleLogin
          className="google"
          image="./google.png"
          text="Sign in with Google"
          clientId={clientID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"sigle_host_policy"}
        />

      </form>
    </div>
  )
}

