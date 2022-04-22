
import React, { useEffect } from 'react'
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [user, setUser] = React.useState(false);

        useEffect(() => {
          const getUser = () => {
            fetch("http://localhost:3030/auth/login/success", {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
              },

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
        </Routes></div>
      </div>
    </BrowserRouter>
  );
}

export default App;
