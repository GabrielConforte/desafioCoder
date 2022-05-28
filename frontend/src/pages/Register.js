import React, { useEffect } from 'react'
/* import facebook from '../img/facebook.png'*/
import { Link } from 'react-router-dom'; 
const {config} = require('../config/index.js');
const BASE_URL = config.base_url;
const axios = require('axios');

export default function Register() {
    
    const [file, setFile] = React.useState(null);


    useEffect(() => {
        console.log(file)
    }
    , [file])

    const register = () => {
        fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                img: " "
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

    const send = event => {
        event.preventDefault();
        const data = new FormData();
        data.append('file', file);

        axios.post(`${BASE_URL}/auth/img`, data).then(res => {
            console.log(res.data);}).catch(err => {
                console.log(err);
            }
        );

    }

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
               <form className='formLog' encType='multipart/form-data'>
                Registro con email
                <input className="m-2" type="text" placeholder='Nombre' id="name" autoComplete=''></input>
                <input className="m-2" type="text" placeholder='Email' id="email" autoComplete=''></input>
                <input className="m-2" type="password" placeholder='Contraseña' id="password" autoComplete=''></input>
                <input className="m-2" type="password" placeholder='Contraseña Otra Vez' id="passwordB" autoComplete=''></input>
                 <input type="file" name="img" id="img" accept='.jpg'></input>
                <button className='submit m-2' onClick={comprobar}>Iniciar</button>
                <Link to='/login' ><button className='submit m-2'>Ya tengo usuario</button></Link>
               </form> 
            </div>
            <form onSubmit={send}>
                <input type="file" name="img" id="img2" 
                onChange={event => {
                    const  files  = event.target.files[0];
                    setFile(files);
                }}>
                </input>
                <button type="submit">
                    </button>
                    </form>
            
        </div>
    </div>
  )
}
