import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { agregarCliente } from '../../../../../redux/actions/pedidosActions';
import swal from 'sweetalert';

export default function AgregarCliente(
    {
        closeModal
    }
) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [dis, setDis] = useState("");

    const [nombre, setNombre] = useState("");
    const [codigo, setCodigo] = useState("");
    const [ruc, setRuc] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [provincia, setProvincia] = useState("");
    const [parroquia, setParroquia] = useState("");
    const [direccion, setDireccion] = useState("");

    const [valuesForm, setValuesForm] = useState({});

    const [err, setErr] = useState({})

    const validateErrors = (values) => {
        setValuesForm(values)

        const errors = {}

        if(!values.nombre){
            errors.nombre = "Este campo es requerido!!"
        }

        if(!values.codigo){
            errors.codigo = "Este campo es requerido!!"
        }

        if(!values.ruc){
            errors.ruc = "Este campo es requerido!!"
        }

        if(!values.ciudad){
            errors.ciudad = "Este campo es requerido!!"
        }

        if(!values.provincia){
            errors.provincia = "Este campo es requerido!!"
        }

        if(!values.parroquia){
            errors.parroquia = "Este campo es requerido!!"
        }

        if(!values.direccion){
            errors.direccion = "Este campo es requerido!!"
        }

        setErr(errors)

        if (Object.keys(errors).length === 0){
            agregarClienteFunc(values);
        }else{
            console.log("falta un dato");
        }
    }

    const agregarClienteFunc = (values) => {
        dispatch(agregarCliente(values, dis)).then((res) => {
            if(res.status){
                if(res.status === 200){
                    mostrarAlerta(true)
                }else{
                    mostrarAlerta(false)
                }
            }else{
                mostrarAlerta(false)
            }
        })
    }

    const mostrarAlerta = (bool) => {
        if(bool){
            swal({
                title: `AGREGADO`,
                text: "El formulario ha sido enviado exitosamente!!",
                icon: "success",
                buttons: "OK"
              }).then(() => {
                closeModal(false)
                setDis("");
                setNombre("");
                setCodigo("");
                setRuc("");
                setCiudad("");
                setProvincia("");
                setParroquia("");
                setDireccion("");
              })
        }else{
            swal({
                title: "UPS!!!",
                text: "Algo salió mal!!!",
                icon: "error",
                buttons: "OK"
              })
        }
    }

    const agregarJson = () => {
        const datos = {
            nombre: nombre,
            codigo: codigo,
            ruc: ruc,
            ciudad: ciudad,
            provincia: provincia,
            parroquia: parroquia,
            direccion: direccion
        }
        validateErrors(datos)
    }

    const handleChangeDistribuidor = (event) => {
        setDis(event.target.value)
        setNombre("");
        setCodigo("");
        setRuc("");
        setCiudad("");
        setProvincia("");
        setParroquia("");
        setDireccion("");
    }

    return (
        <div className='fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='bg-white p-5 rounded flex flex-col gap-5 justify-center' style={{
                width: 1200,
                height: 1000,
                backgroundColor: 'steelblue',
                style: "border: 5px outset red;"
                }}>
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <label htmlFor="distribuidor">Seleccionar distribuidor:</label>
                            <select className="form-select" id="distribuidor" value={dis} onChange={handleChangeDistribuidor}>
                                <option value="">Seleccionar...</option>
                                <option value="leterago">LETERAGO</option>
                                <option value="quifatex">QUIFATEX</option>
                                <option value="difare">DIFARE</option>
                                {/* <option value="farmaenlace">FARMAENLACE</option> */}
                            </select>
                        </div>
                        <div className="col-md-16 flex">
                            <div className="form-group" style={{ width: '50%' }}>
                                <label htmlFor="fecha">NOMBRE CLIENTE:</label>
                                <input type="text" className="form-control" value={nombre} id="nombre_cliente" disabled={!dis} name="nombre_cliente" onChange={(e) => {
                                    if(e.target.value) setNombre(e.target.value)
                                    else setNombre("")
                                }}/>
                                {err.nombre ? (
                                    <div>
                                        <p className="text-sm font-normal text-red-700 mt-1">
                                            {err.nombre}
                                        </p>
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group" style={{ width: '50%' }}>
                                <label htmlFor="fecha">CÓDIGO CLIENTE:</label>
                                <input type="number" className="form-control" value={codigo} id="codigo" disabled={!dis} name="codigo" onChange={(e) => {
                                    if(e.target.valueAsNumber) setCodigo(e.target.value)
                                    else setCodigo("")
                                }}/>
                                {err.codigo ? (
                                    <div>
                                        <p className="text-sm font-normal text-red-700 mt-1">
                                            {err.codigo}
                                        </p>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="col-md-16 flex">
                            <div className="form-group" style={{ width: '50%' }}>
                                <label htmlFor="fecha">RUC CLIENTE:</label>
                                <input type="text" className="form-control" value={ruc} id="ruc" disabled={!dis} name="ruc" onChange={(e) => {
                                    if(e.target.value) setRuc(e.target.value)
                                    else setRuc("")
                                }}/>
                                {err.ruc ? (
                                    <div>
                                        <p className="text-sm font-normal text-red-700 mt-1">
                                            {err.ruc}
                                        </p>
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group" style={{ width: '50%' }}>
                                <label htmlFor="fecha">CIUDAD CLIENTE:</label>
                                    <input type="text" className="form-control" value={ciudad} id="ciudad" disabled={!dis} name="ciudad" onChange={(e) => {
                                        if(e.target.value) setCiudad(e.target.value)
                                        else setCiudad("")
                                    }}/>
                                    {err.ciudad ? (
                                        <div>
                                            <p className="text-sm font-normal text-red-700 mt-1">
                                                {err.ciudad}
                                            </p>
                                        </div>
                                    ) : null}
                            </div>
                        </div>
                        <div className="col-md-16 flex">
                            <div className="form-group" style={{ width: '50%' }}>
                                <label htmlFor="fecha">PROVINCIA CLIENTE:</label>
                                <input type="text" className="form-control" value={provincia} id="provincia" disabled={!dis} name="provincia" onChange={(e) => {
                                    if(e.target.value) setProvincia(e.target.value)
                                    else setProvincia("")
                                }}/>
                                {err.provincia ? (
                                    <div>
                                        <p className="text-sm font-normal text-red-700 mt-1">
                                            {err.provincia}
                                        </p>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="col-md-16 flex">
                            <div className="form-group" style={{ width: '50%' }}>
                                <label htmlFor="fecha">PARROQUIA CLIENTE:</label>
                                <input type="text" className="form-control" value={parroquia} id="parroquia" disabled={!dis} name="parroquia" onChange={(e) => {
                                    if(e.target.value) setParroquia(e.target.value)
                                    else setParroquia("")
                                }}/>
                                {err.parroquia ? (
                                    <div>
                                        <p className="text-sm font-normal text-red-700 mt-1">
                                            {err.parroquia}
                                        </p>
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group" style={{ width: '50%' }}>
                                <label htmlFor="fecha">DIRECCION CLIENTE:</label>
                                <input type="text" className="form-control" value={direccion} id="direccion" disabled={!dis} name="direccion" onChange={(e) => {
                                    if(e.target.value) setDireccion(e.target.value)
                                    else setDireccion("")
                                }}/>
                                {err.direccion ? (
                                    <div>
                                        <p className="text-sm font-normal text-red-700 mt-1">
                                            {err.direccion}
                                        </p>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <button className="btn1 btn btn-success" disabled={!dis} onClick={() => agregarJson()}>AGREGAR CLIENTE</button>
                        <button className="btn1 btn btn-danger" onClick={() => closeModal(false)}>CERRAR</button>
                    </div>
            </div>
        </div>
    )
}