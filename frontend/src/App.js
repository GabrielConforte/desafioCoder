
import React, {useEffect, useState} from 'react'
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import FormEdit from './components/FormEdit';
import Formulario from './components/Formulario';
import Carrito from './components/Carrito';
const {config} = require('./config/index.js');



const BASE_URL = config.base_url;

function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const  [carrito, setCarrito] = useState(JSON.parse(sessionStorage.getItem('carrito')));
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    if (user) {
      setIsLogged(true);
      if(carrito===null){
      fetch(`${BASE_URL}/api/carrito/${user._id}`)
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("Error al obtener los productos");
      }
      )
      .then((resObject) => {
        sessionStorage.setItem('carrito', JSON.stringify(resObject));
        setCarrito(resObject);
      }
      )
      .catch((err) => {
        console.log(err);
      }
      );

    }
  }else{
    setTimeout(() => {
      setUser(JSON.parse(sessionStorage.getItem('user')));
    }
    , 1000);
  }
  }, [user, carrito]);
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar user={user} carrito={carrito}/> 
        <div className='contenido'><Routes>
          <Route path="/" element={isLogged ? <><Home user={user} carrito={carrito}/></> : <Navigate to="/login"/> } />
          <Route path="/login" element={isLogged ? <Navigate to="/"/> : <Login/>} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/edit/:id" element={<FormEdit/>} />
          <Route path="/agregar" element={<Formulario/>} />
          <Route path="/carrito" element={<Carrito/>} />
        </Routes></div>
      </div>
    </BrowserRouter>
  );
}

export default App;
