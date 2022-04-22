import React from 'react'

export default function Card({post}) {
  return (
    <div className='card'>
        <span className='title'>{post.title}</span>
        <img alt="portada"className="cardImg"src={post.image}></img>
        <p className='price'>{post.price}</p>
        <button className='cardButton'>ver</button>
    </div>
  )
}
