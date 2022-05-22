import React from 'react'
/* import facebook from '../img/facebook.png'*/
import { Link } from 'react-router-dom'; 
const {config} = require('../config/index.js');
const BASE_URL = config.base_url;

export default function login() {

    /* const facebookLogin = () => {
        window.open(`${BASE_URL}/auth/facebook`, "_self")
    } */

const localLogin = (e) => {
    e.preventDefault();
        fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            })
        }).then(res => res.json())
        .then(data => {
            if (data.status === 200) {
                alert(data.message);
                window.location.href = '/';
            } else {
                alert(data.message);
            }
        })
    }
  return (
    <div className='login'>
        <h1 className='loginTitle p-3'>Inicio de sesión</h1> 
        <div className='wrap'>
            <div className='derecha input'>
                <form className='formLog'>
                Login con tu cuenta
                <input className="m-2" type="text" placeholder='Email' id="email"></input>
                <input  className="m-2" type="text" placeholder='Contraseña' id="password"></input>
                <button  className='m-2 submit' onClick={localLogin}>Iniciar</button>
                <Link to='/register' ><button className='m-2 submit'>Registrarse</button></Link>
                </form>
            </div>
        </div>
    </div>
  )
}

/**
            <div className='izquierda'>
                Login con redes sociales
                <div className="loginButton facebook" onClick={facebookLogin}>
                    <img src={facebook} alt="icono de facebook" className="icon"/>
                    facebook
                </div>
            </div>

            <div className='separador'>
            </div> */