import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Info() {

    const [info, setInfo] = React.useState(null)
   
    useEffect(() => {
      setTimeout(() => {
        fetch(`${BASE_URL}/info`)
            .then(res => res.json())
            .then(data => setInfo(data))
    }, 100);
    }, []);

  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Plataforma</th>
                    <th>Version</th>
                    <th>Memoria Total</th>
                    <th>Path</th>
                    <th>PID</th>
                    <th>Carpeta</th>
                </tr>
            </thead>
            <tbody> 
                <tr>  
                    <td>{info && info.plataforma}</td>
                    <td>{info && info.version}</td>
                    <td>{info && info.memoriaTotal}</td>
                    <td>{info && info.path}</td>
                    <td>{info && info.pid}</td>
                    <td>{info && info.carpeta}</td>
                </tr>
            </tbody>
           
            
        </table>
     <Link className='buttonContent' to="/"><button className='cardButton'>volver</button></Link>
 </div> )
}
