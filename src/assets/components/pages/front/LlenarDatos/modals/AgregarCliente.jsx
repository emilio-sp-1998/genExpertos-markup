import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AgregarCliente(
    {
        closeModal
    }
) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className='fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='bg-white p-5 rounded flex flex-col gap-5 justify-center' style={{
                width: 1200,
                height: 600,
                backgroundColor: 'steelblue',
                style: "border: 5px outset red;"
                }}>
                    <div className="col-md-16 flex">
                        <div className="form-group">
                            <label htmlFor="fecha">NOMBRE CLIENTE:</label>
                            <input type="text" className="form-control" id="nombre_cliente" name="nombre_cliente"/>
                        </div>
                    </div>
                    <button className="btn1 btn btn-danger" onClick={() => closeModal(false)}>CERRAR</button>
            </div>
        </div>
    )
}