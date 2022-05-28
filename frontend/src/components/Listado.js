
import React from "react";
import { useState, useEffect } from "react";
/* import {AppContext} from "./contexts/ContextoCarrito";
import {useContext} from "react"; */
import Tarjeta from "./Tarjeta";
const {config} = require('../config/index.js');
const BASE_URL = config.base_url;
function Listado(user) {
    let carrito = user.user.carrito
    user  = user.user.user
    const [productos, setProductos] = useState([]);
    const [loader, setLoader] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    
    useEffect(() => {
        setTimeout(() => {
            comprobarAdmin(user);
            getLista();
        }, 1000);
    }, [user, carrito]);
 
    const comprobarAdmin = (user) => {
            fetch(`${BASE_URL}/auth/check/${user.email}`, {
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

    const getLista = () => {
        fetch(`${BASE_URL}/api/productos`)
        .then((response) => {
            if (response.status === 200) return response.json();
            throw new Error("Error al obtener los productos");
        })
        .then((resObject) => {
            setProductos(resObject);
            setLoader(false);
        }) 
        .catch((err) => {
            console.log(err);
        });
    };

    const eliminarProducto = (id) => {
        if(isAdmin){
            fetch(`${BASE_URL}/api/productos/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProductos(productos.filter(productos => productos._id !== id));
                window.location.reload();
            })}
            else{
                alert("No tienes permisos para eliminar productos");
            }
    }

  
    const editarProducto = (productos) => {
        window.location.href = `/edit/${productos._id}`;
    }

    const agregarAlCarrito = (id) => {
        fetch(`${BASE_URL}/api/carrito/${user._id}/productos/${id}`, 
        {
            method: "POST"
        }).then(res => res.json())
            .then(data => {console.log( `${BASE_URL}/api/carrito/${user._id}/productos/${id}`);})
            .catch(err => {
                console.log(err);
                
            }
            )
    }


        

    return (
        <div className="container">
        {loader ? (
        <>  <button className="btn btn-light" type="button" disabled>
            <span className="spinner-grow spinner-grow-sm" role="status"  aria-hidden="true"></span>
            </button>
            <button className="btn btn-light" type="button" disabled>
            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            </button>
            <button className="btn btn-light" type="button" disabled>
            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            </button>
        
          </>
        ) : (<>
        
        {productos.length > 0 ?
            ( <div className="row">
            {productos.map(producto => (
                    <Tarjeta
                        key={producto._id}
                        isAdmin={isAdmin}
                        productos={producto}
                        eliminarProducto={eliminarProducto}
                        editarProducto={editarProducto}
                        agregarAlCarrito={agregarAlCarrito}/>
                ))}
            </div>
            )
            : (
             <div className="col-5">
                 <div className="card">
                     <div className="card-body">
                         <div className="card-text">
                                    <h4>No hay productos</h4>
                            </div>
                        </div>
                    </div>
                </div>
            )}
         </>) }
        </div>
    );
}

export default Listado; 