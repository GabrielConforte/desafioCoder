
import React, { useEffect } from 'react'
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Info from './pages/Info';
import Random from './pages/random';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [user, setUser] = React.useState(true);

        useEffect(() => { 
          const getUser = () => {
            fetch("http://localhost:3030/auth/login/success", {
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
          {
            //haz qye la ruta route sea /random/:cant y envie al componente Random la cantidad de numeros que se quiere
          }
          <Route path="/random/:cant" element={<Random/>} />
        </Routes></div>
      </div>
     
      
    </BrowserRouter>
    
  );
}

export default App;
