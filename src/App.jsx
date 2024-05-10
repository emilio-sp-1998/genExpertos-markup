import React from 'react'
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Login from './assets/components/pages/front/Login/Login'
import Cargando from "./assets/components/pages/backend/Cargando";
import LlenarDatos from './assets/components/pages/front/LlenarDatos/LlenarDatos';
import Logout from './assets/components/pages/front/Logout/Logout';
import PrivateRoute from './PrivateRoute';
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route exact path="/cargando" element={<Cargando />} />
      <Route exact path="/logout" element={<Logout />} />

      <Route 
        exact 
        path="/llenarDatos" 
        element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
          <Route exact path="/llenarDatos" element={<LlenarDatos/>}/>
      </Route>

    </Routes>
  )
}

export default App
