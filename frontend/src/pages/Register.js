import React from 'react'
/* import facebook from '../img/facebook.png'*/
import { Link } from 'react-router-dom'; 
const {config} = require('../config/index.js');
const BASE_URL = config.base_url;

export default function Register() {
    
    const register = () => {
        fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            })
        })//el servidor enviara el status y el mensaje
        .then(res => res.json())
        .then(data => {
            if (data.status === 200) {
                alert(data.message);
                window.location.href = '/login';
            } else {
                alert(data.message);;
            }
        })
    }

    //esto se podria evitar despues si la comprobacion se hace desde el backend
    const comprobar = (e) => {
        e.preventDefault();
        if(document.getElementById('name').value === '' || document.getElementById('email').value === '' || document.getElementById('password').value === '' || document.getElementById('passwordB').value === ''){
            alert('Rellena todos los campos')
        }
        else if(document.getElementById('password').value !== document.getElementById('passwordB').value){
            alert('Las contraseñas no coinciden')
        }
        else{
            register()
        } 
    }

  return (
    <div className='login'>
        <h1 className='loginTitle p-3'>Registra tu usuario</h1> 
        <div className='wrap'>
            <div className='derecha input'>
               <form className='formLog'>
                Registro con email
                <input className="m-2" type="text" placeholder='Nombre' id="name" autoComplete=''></input>
                <input className="m-2" type="text" placeholder='Email' id="email" autoComplete=''></input>
                <input className="m-2" type="password" placeholder='Contraseña' id="password" autoComplete=''></input>
                <input className="m-2" type="password" placeholder='Contraseña Otra Vez' id="passwordB" autoComplete=''></input>
                <button className='submit m-2' onClick={comprobar}>Iniciar</button>
                <Link to='/login' ><button className='submit m-2'>Ya tengo usuario</button></Link>
               </form> 
            </div>
            
        </div>
    </div>
  )
}
