
import React, { useEffect } from 'react'
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Info from './pages/Info';
import Random from './pages/random';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import FormEdit from './components/FormEdit';
import Formulario from './components/Formulario';

//import ContextoCarrito from "./components/contexts/ContextoCarrito";

function App() {
  const [user, setUser] = React.useState(false);
  //const [carritoId, setCarritoId] = React.useState(null);

  //ya lo voy a poner bonito todo estoy arreglando muchas cosas al mismo tiempo
        useEffect(() => { 
          const getUser = () => {
            fetch("http://localhost:8081/auth/login/success", {
              method: "GET",
            })
              .then((response) => {
                if (response.status === 200) return response.json();
                throw new Error("authentication has been failed!");
              })
              .then((resObject) => {
                setUser(resObject.user);
              })
              .catch((err) => {
                console.log(err);
              });
          };
          getUser();
        }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar user={user}/> 
        <div className='contenido'><Routes>
          <Route path="/" element={user ? <Home/>: <Navigate to="/login"/> } />
          <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>} />
          <Route path="/info" element={<Info/>} />
          <Route path="/random/:cant" element={<Random/>} />
          <Route path="/edit/:id" element={<FormEdit/>} />
          <Route path="/agregar" element={<Formulario/>} />
        </Routes></div>
      </div>
    </BrowserRouter>
  );
}

export default App;
