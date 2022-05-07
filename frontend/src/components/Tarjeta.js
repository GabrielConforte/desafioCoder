import React from 'react'

export default function Tarjeta({productos, eliminarProducto, editarProducto}) {
  return (
    <div key={productos._id} className='tarjeta'>
        <span className='title'>{productos.title}</span>
        <img alt="portada"className="cardImg"src={productos.thumbnail}></img>
        <p className='price'>{productos.price}</p>
        <button className='cardButton' onClick={() => eliminarProducto(productos._id)}>eliminar</button>
        <button className='cardButton' onClick={() => editarProducto(productos)}>editar</button> 
    </div>
  )
}
 // <button className='cardButton' onClick={() => post.agregarAlCarrito(post.id)}>agregar al carrito</button>