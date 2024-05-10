import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LlenarDatos = () => {
    const navigate = useNavigate();

    const [distribuidorSeleccionado, setDistribuidorSeleccionado] = useState("");

    const logout = () => {
        navigate("/logout")
    }

    const handleChange = (event) => {
        setDistribuidorSeleccionado(event.target.value);
    };

    return(
        <div className="container">
            <div className="row">
                <div className="col text-center mt-5">
                    <h1>Levantamiento de pedidos</h1>
                    <h2>Proyecto GenExpertos - MarkUP</h2>
                </div>
            </div>
            <div className="row mt-3">
            <div className="col-md-6">
                <label htmlFor="distribuidor">Seleccionar distribuidor:</label>
                    <select className="form-select" id="distribuidor" value={distribuidorSeleccionado} onChange={handleChange}>
                        <option value="">Seleccionar...</option>
                        <option value="leterago">LETERAGO</option>
                        <option value="quifatex">QUIFATEX</option>
                        <option value="farmaenlace">FARMAENLACE</option>
                    </select>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                {/* Mostramos el distribuidor seleccionado debajo del combobox */}
                <p>Distribuidor seleccionado: {distribuidorSeleccionado}</p>
                </div>
            </div>
            <button type="button" class="btn btn-danger" onClick={() => logout()}>Logout</button>
        </div>
    )
}
export default LlenarDatos;