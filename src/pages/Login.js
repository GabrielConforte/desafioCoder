import React from 'react'
import facebook from '../img/facebook.png'
export default function login() {

    const client = "http://localhost:3030";

    const facebookLogin = () => {
        window.open(`${client}/auth/facebook`, "_self")
    }
  return (
    <div className='login'>
        <h1 className='loginTitle'>Inicio de sesión</h1> 
        <div className='wrap'>
            <div className='izquierda'>
                Login con redes sociales
                <div className="loginButton facebook" onClick={facebookLogin}>
                    <img src={facebook} alt="icono de facebook" className="icon"/>
                    facebook
                </div>
            </div>

            <div className='separador'>
            </div>
            <div className='derecha input'>
                Login con tu cuenta
                <input type="text" placeholder='Nombre de usuario'></input>
                <input type="text" placeholder='Contraseña'></input>
                <button className='submit'>Iniciar</button>
            </div>
        </div>
    </div>
  )
}