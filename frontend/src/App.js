
import React, {useEffect} from 'react'
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import FormEdit from './components/FormEdit';
import Formulario from './components/Formulario';
const {config} = require('./config/index.js');
const BASE_URL = config.base_url;

function App() {
  const [user, setUser] = React.useState(null);
  const [isLogged, setIsLogged] = React.useState(false);
  useEffect(() => {
    fetch(`${BASE_URL}/auth/user`,{
      method: 'GET',
    }).then(res => res.json())
    .then(data => {
      if(data.user){
        setUser(data.user);
        setIsLogged(true);
      }
    })
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar user={user}/> 
        <div className='contenido'><Routes>
          <Route path="/" element={isLogged ? <Home/>: <Navigate to="/login"/> } />
          <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/edit/:id" element={<FormEdit/>} />
          <Route path="/agregar" element={<Formulario/>} />
        </Routes></div>
      </div>
    </BrowserRouter>
  );
}

export default App;
