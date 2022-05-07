
import React from "react";
import { useState, useEffect } from "react";
/* import {AppContext} from "./contexts/ContextoCarrito";
import {useContext} from "react"; */
import Tarjeta from "./Tarjeta";

function Listado() {
    const [productos, setProductos] = useState([]);
    const [loader, setLoader] = useState(true);
   // const {carritoId} = useContext(AppContext);
    const URL = "http://localhost:8081"; 
  
    useEffect(() => {
        setTimeout(() => {
        getLista();
        }, 1000);
    }, []);
 
    //crea un metodo getLista
    const getLista = () => {
        fetch(`${URL}/api/productos`)
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
        fetch(`${URL}/api/productos/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProductos(productos.filter(productos => productos.code !== id));
                window.location.reload();
            })
    }

  
    const editarProducto = (productos) => {
        window.location.href = `/edit/${productos._id}`;
    }
/*
    const agregarAlCarrito = (id) => {console.log(carritoId)
        fetch(`/api/carrito/${carritoId}/productos/${id}`, {
            method: "POST"
        }) 

        }*/

  

    return (
        <>
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
            ( <>{productos.map(producto => (
                    <Tarjeta
                        key={producto._id}
                        productos={producto}
                        eliminarProducto={eliminarProducto}
                        editarProducto={editarProducto}/>
                
                ))}</>
            )
            : (
             <div className="col-5">
                 <div className="card">
                     <div className="card-body">
                         <div className="card-text">
                                    <h4>No hay productos</h4>
                                    <button className="btn btn-primary" type="button" onClick={() => window.location.href = "/agregar"}>Agregar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        
         </>) }
        </>
    );
}




export default Listado;
