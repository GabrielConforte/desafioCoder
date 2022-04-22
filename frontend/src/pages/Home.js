import React from 'react';
import {post} from '../ejemplos'
import Card from '../components/Card'
import {Link} from 'react-router-dom'
export default function home() {
  return (
    <><div className='home'>
        {post.map(post => (
                <Card key={post.id} post={post}/>
        ))}
        
    </div>
    
    <Link className='buttonContent' to="/info"><button className="cardButton">ver info</button></Link></>
    
  )
}
