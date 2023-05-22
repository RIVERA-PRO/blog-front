import React from 'react';
import './LogIn.css';
import { useRef, useState, useEffect } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import alertActions from '../../Store/Alert/actions';
import { useNavigate, useParams } from 'react-router';
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";
const { open } = alertActions;

export default function SignIn() {
  const [reload, setReload] = useState(false); // Estado para actualizar el componente
  const dispatch = useDispatch();
  const dataForm = useRef();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    let formInputs = [];

    Object.values(dataForm.current.elements).forEach((e) => {
      if (e.nodeName === 'INPUT' && e.name) {
        formInputs.push(e);
      }
    });
    formInputs.pop();
    let data = {
      [formInputs[0].name]: formInputs[0].value,
      [formInputs[1].name]: formInputs[1].value,
    };
    console.log(data);

    let url = 'https://dev2-lv2s.onrender.com/users/signin';
    try {
      let res = await axios.post(url, data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem(
        'user',
        JSON.stringify({
          name: res.data.user.name,
          mail: res.data.user.mail,
          photo: res.data.user.photo,
          user_id: res.data.user._id,
          profile: res.data.user.profile,
          banner: res.data.user.banner
        })
      );
      setReload(true); // Actualizar el estado para recargar el componente
      let dataAlert = {
        icon: 'success',
        title: "Inicio correctamente",
        type: 'toast',
      };
      dispatch(open(dataAlert));
      dataForm.current.reset();
    } catch (error) {
      console.error(error);
      let errorMessage = '';
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
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
    let url = "https://dev2-lv2s.onrender.com/users/signin";
    let token = localStorage.getItem("token");
    let headers = { headers: { Authorization: `Bearer ${token} }` } };

    try {
      const { name, email, imageUrl, googleId } = response.profileObj;

      const data = {
        name: name,
        mail: email,
        password: googleId,
      };
      console.log(data.name)
      if (email) await axios.post(url, data, headers);
      let res = await axios.post(url, data, headers);
      localStorage.setItem(`token`, res.data.token);
      localStorage.setItem(
        `user`,
        JSON.stringify({
          name: name,
          mail: email,
          photo: imageUrl,
          user_id: res.data.user._id,
          profile: res.data.user.profile,
          banner: res.data.user.banner
        })
      );
      setReload(true);
      let dataAlert = {
        icon: "success",
        title: "Inicio correctamente",
        type: "toast",
      };
      dispatch(open(dataAlert));
      navigate("/");
      dataForm.current.reset();
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
  };
  const onFailure = () => {
    console.log("Something went wrong");
  };

  // Si el estado "reload" es true, recargar la página
  if (reload) {
    window.location.reload();
  }


  return (
    <div className='form-register-contain'>
      <form action='' className='form-register' onSubmit={handleSubmit} ref={dataForm}>
        <h4>Ingresar</h4>
        <label htmlFor=''>Email</label>
        <input type='email' placeholder='Email' name='mail' id='mail' />
        <label htmlFor=''>Contraseña</label>
        <input type='password' placeholder='Contraseña' name='password' id='password' />
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
  );
}

