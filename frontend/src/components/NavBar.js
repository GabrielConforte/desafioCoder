import React from 'react'
import {Link} from 'react-router-dom'
const {config} = require('../config/index.js');
const BASE_URL = config.base_url;

export default function NavBar({user}) {
  
  const {name,email,img} = user || {};


  const logoutFunction = () => {
   fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(data => {
      if (data.status === 200) {
        localStorage.removeItem('user');
        window.location.href = '/';
      } else {
        alert("algo salio mal");
      }
    })
  }


  return (
    <div className='navbarCustom'>
      <Link className="LinkCustom"to='/' >
        <span className="logoCustom">CoderDesafios</span>
        </Link>
        {user ? (<ul className="list">
        <li className="item">
          <img src={user.img} className='avatar' alt="imagen del avatar de esta persona"></img>
        </li>
        <li className="item">{user.nombre}</li>
        <li className="item logout" onClick={logoutFunction}>Logout</li>
      </ul>): (<Link className='Link' to="/login">Ingresar</Link>)}
      
    </div>
  )
}
