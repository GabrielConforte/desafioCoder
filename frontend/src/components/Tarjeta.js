import React from 'react'

export default function Tarjeta({productos, eliminarProducto, editarProducto, isAdmin, agregarAlCarrito}) {
  
  return (
    <div className="col-4 text-center">
        <div className="card">
            <div className="card-body">
                <div className="card-text">
                    <h4>{productos.title}</h4>
                    <p>{"$"+productos.price}</p>
                    <p>{<img width="50px" src={productos.thumbnail}></img>}</p>
                    {isAdmin ? (<>
                        <button type="submit" onClick={()=>eliminarProducto(productos._id)} className="m-2 btn btn-danger">eliminar</button>
                        <button type="submit" onClick={()=>editarProducto(productos._id)} className="m-2 btn btn-warning">editar</button>
                    </>) : (<>
                        <button type="submit" onClick={()=>agregarAlCarrito(productos._id)} className="m-2 btn btn-primary">agregar al carrito</button>
                    </>)}
                </div>
            </div>
        </div>
    </div>

  )
}