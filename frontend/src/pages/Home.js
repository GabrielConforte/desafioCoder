import React , {useEffect, useState} from 'react';
import Listado from '../components/Listado'
const {config} = require('../config/index.js');
const BASE_URL = config.base_url;

export default function Home(user) {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    setTimeout(() => {
    comprobarAdmin(user);
    }, 1000);
  }, [user]);

  const comprobarAdmin = (user) => {
            fetch(`${BASE_URL}/auth/check/${user.user.email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                    }
                    })
                    .then(res => res.json())
                    .then(data => {
                            setIsAdmin(data.isAdmin);
                        }
                )
    }

  return (
    <> 
        <div className='home container'>
            {isAdmin ? (<>
        <div className=' mb-3 m-auto row'>
          <div className='col-12'>
          <button className="btn btn-success" type="button" onClick={() => window.location.href = "/agregar"}>Agregar otro elemento</button>
          </div>
          </div>
            </> )
          :
          (<></>)}
          <Listado user={user}/>
      </div>
    </>
  )
}
