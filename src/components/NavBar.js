import React from 'react'
import {Link} from 'react-router-dom'

export default function NavBar({user}) {
  return (
    <div className='navbar'>
      <Link className="Link"to='/' >
        <span className="logo">CoderDesafios</span>
        </Link>
        {user ? (<ul className="list">
        <li className="item">
          <img src="https://source.unsplash.com/random" className='avatar' alt="imagen del avatar de esta persona"></img>
        </li>
        <li className="item">user name</li>
        <li className="item logout">Logout</li>
      </ul>): (<Link className='Link' to="/login">Ingresar</Link>)}
      
    </div>
  )
}
