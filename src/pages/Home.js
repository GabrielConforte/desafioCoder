import React from 'react';
import {post} from '../ejemplos'
import Card from '../components/Card'
export default function home() {
  return (
    <div className='home'>
        {post.map(post => (
                <Card key={post.id} post={post}/>
        ))}
    </div>
  )
}
