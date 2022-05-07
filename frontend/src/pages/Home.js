import React from 'react';
import Listado from '../components/Listado'
import {Link} from 'react-router-dom'
export default function home() {
  return (
    <> Tranquilos, ya voy a poner lindo el front!
    
    <div className='home'>
     
        <Listado/>
    </div>
    
    <Link className='buttonContent' to="/info"><button className="cardButton">ver info</button></Link></>
    
    
  )
}
