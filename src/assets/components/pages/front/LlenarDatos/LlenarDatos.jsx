import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';

const LlenarDatos = () => {
    const navigate = useNavigate();

    const logout = () => {
        navigate("/logout")
    }
    return(
        <button type="button" class="btn btn-danger" onClick={() => logout()}>Logout</button>
    )
}
export default LlenarDatos;