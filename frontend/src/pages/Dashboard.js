import React from 'react';
//importa los componentes login y register
import Login from './Login';
import Register from './Register';


function Dashboard() {
    const option = false
    return (
        <>
        <div className=''>
        {option ? 
        <div className=''>
            <Login/>
        </div>
        :
        <div className=''>
            <Register />
                </div>
        }</div>
        </>
    )
}

export default Dashboard;