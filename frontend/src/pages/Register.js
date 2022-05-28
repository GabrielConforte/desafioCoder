import React, { useEffect } from 'react'
/* import facebook from '../img/facebook.png'*/
import { Link } from 'react-router-dom'; 
const {config} = require('../config/index.js');
const BASE_URL = config.base_url;
const axios = require('axios');

export default function Register() {
    
    const [file, setFile] = React.useState(null);
    const [nombre, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    useEffect(() => {
        console.log(file)
    }
    , [file])

    const register = () => {
        const formData = new FormData();
        const data = new FormData();
        console.log(formData)
        formData.append('email', email);
        formData.append('password', password);
        formData.append('nombre', nombre);
        formData.append('file', file);
        axios.post(`${BASE_URL}/auth/register`, formData)
            .then(res => {
                console.log(res)
            }
            )
            .catch(err => {
                console.log(err)
            }
            )
        /* data.append('file', file);
            axios.post(`${BASE_URL}/auth/img`, data).then(res => {
                console.log(res.data);}).catch(err => {
                    console.log(err);
                }
            ) */
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
        if(document.getElementById('nombre').value === '' || document.getElementById('email').value === '' || document.getElementById('password').value === '' || document.getElementById('passwordB').value === ''){
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
            <form className='formLog' onSubmit={register}>
                <label htmlFor='nombre'>Nombre</label>
                <input type='text' id='nombre' onChange={(e) => setName(e.target.value)}/>
                
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' onChange={(e) => setEmail(e.target.value)}/>
                
                <label htmlFor='password'>Contraseña</label>
                <input type='password' id='password' autoComplete=" " onChange={(e) => setPassword(e.target.value)}/>
                
                <label htmlFor='passwordB'>Confirmar contraseña</label>
                <input type='password' id='passwordB' autoComplete=" " onChange={(e) => setPassword(e.target.value)}/>
                
                <input type="file" name="file" id="file" 
                onChange={event => {
                    const  files  = event.target.files[0];
                    setFile(files);
                }}>
                </input>
                <button className='submit m2' type="submit">Iniciar</button>
                    </form>
                    <Link to='/login' ><button className='submit m-2'>Ya tengo usuario</button></Link>
                       </div>
                </div>
    </div>
  )
}
