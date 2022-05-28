
import React,{ useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
//import CarritoIcon from './CarritoIcon'
const {config} = require('../config/index.js');
const BASE_URL = config.base_url;


export default function NavBar({user, carrito}) {
      const [img, setImg] = useState("");
      const img2 = 'https://cdn-icons-png.flaticon.com/512/18/18399.png';

  useEffect(() => {
    if (user) {
      setImg(`${BASE_URL}/images/${user.img}`);
    }else{
      setImg(`${BASE_URL}/images/default.png`);
    }
  }, [user]);

  const logoutFunction = () => {
   fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(data => {
      if (data.status === 200) {
        sessionStorage.removeItem('user');
        
        console.log(img)
        sessionStorage.removeItem('carrito')
       
        window.location.href = '/';
      } else {
        alert("algo salio mal - logout");
      }
    })
  }


  return (
    <div className='navbarCustom '>
      
      <Link className="LinkCustom"to='/' >
        <span className="logoCustom">CoderDesafios</span>
        </Link>
        {user ? (<ul className="mt-3 list">
        <li className="item">
          <img src={img} className='avatar' alt="imagen del avatar de esta persona">
          </img>
        </li>
        <li className="item">{user.nombre}</li>
        {/* <CarritoIcon user={user} carrito={carrito}></CarritoIcon> */}
        <li className='btn-light m-3'><Link to='/carrito'><img src={img2} className='icon m-3'></img></Link></li>
        <li className="item logout" onClick={logoutFunction}>Desconectar</li>
      </ul>): (<Link className='Link' to="/login">Ingresar</Link>)}
      
    </div>
  )
}