import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { agregarCliente, verificarClienteExistente, verificarRucClienteExistente } from '../../../../../redux/actions/pedidosActions';
import swal from 'sweetalert';
import "./AgregarCliente.css"

export default function AgregarCliente(
    {
        closeModal,
        isOpen
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

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
          } else {
            document.body.classList.remove('no-scroll');
          }
      }, [isOpen]);

    const validateErrors = (values) => {
        setValuesForm(values)

        const errors = {}

        if(!values.nombre){
            errors.nombre = "Este campo es requerido!!"
        }

        if(!values.codigo){
            errors.codigo = "Este campo es requerido!!"
        }

        if(!values.ruc) errors.ruc = "Este campo es requerido!!"
        else if(values.ruc.length !== 13) errors.ruc = "Debe tener 13 digitos!!"

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

        dispatch(verificarRucClienteExistente(ruc, dis)).then((res) => {
            if(res.status){
                if(res.status === 200){
                    const data = res.data
                    if(!data.bool){
                        dispatch(verificarClienteExistente(codigo, dis)).then((res) => {
                            if(res.status){
                                if(res.status === 200){
                                    const data = res.data
                                    if(!data.bool){
                                        dispatch(agregarCliente(values, dis)).then((res) => {
                                            if(res.status){
                                                if(res.status === 200) mostrarAlerta(true) 
                                                else mostrarAlerta(false, "Algo salió mal!!!")
                                            }else mostrarAlerta(false, "Algo salió mal!!!")
                                        })
                                    }else mostrarAlerta(false, "Ya existe un Cliente con ese código, intente otro!!!")
                                }else mostrarAlerta(false, "Algo salió mal!!!")
                            }else mostrarAlerta(false, "Algo salió mal!!!")
                        })
                    }else mostrarAlerta(false, "Ya existe un Cliente con ese RUC, intente otro!!!")
                }else mostrarAlerta(false, "Algo salió mal!!!")
            }else mostrarAlerta(false, "Algo salió mal!!!")
        })
    }

    const mostrarAlerta = (bool, mensaje) => {
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
                text: mensaje,
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

    const handleChangeRuc = (event) => {
        const value = event.target.value;
        if(value){
            if (/^\d*$/.test(value) && value.length <= 13) {
                setRuc(value);
            }
        }else setRuc("");
    }

    return (
        <div className='fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='bg-white p-8 rounded-lg shadow-lg flex flex-col gap-6' 
                style={{ 
                    width: '80%', 
                    maxWidth: '800px', 
                    backgroundColor: 'steelblue', 
                    border: '5px outset red', 
                    maxHeight: '90vh', 
                    overflowY: 'auto' 
                }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="distribuidor" className="block text-sm font-medium text-gray-700">Seleccionar distribuidor:</label>
                    <select className="form-select mt-1 block w-full p-2 border rounded" id="distribuidor" value={dis} onChange={handleChangeDistribuidor}>
                    <option value="">Seleccionar...</option>
                    <option value="leterago">LETERAGO</option>
                    <option value="leterago_franquicia">LETERAGO FRANQUICIA</option>
                    <option value="quifatex">QUIFATEX</option>
                    <option value="difare">DIFARE</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="nombre_cliente" className="block text-sm font-medium text-gray-700">NOMBRE CLIENTE:</label>
                    <input type="text" className="form-control mt-1 block w-full p-2 border rounded" value={nombre} id="nombre_cliente" disabled={!dis} name="nombre_cliente" onChange={(e) => setNombre(e.target.value)} />
                    {err.nombre && <p className="text-sm text-red-600 mt-1">{err.nombre}</p>}
                </div>
                <div>
                    <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">CÓDIGO CLIENTE (O RUC SI NO DISPONE DEL CÓDIGO):</label>
                    <input type="text" className="form-control mt-1 block w-full p-2 border rounded" value={codigo} id="codigo" disabled={!dis} name="codigo" onChange={(e) => setCodigo(e.target.value)} />
                    {err.codigo && <p className="text-sm text-red-600 mt-1">{err.codigo}</p>}
                </div>
                <div>
                    <label htmlFor="ruc" className="block text-sm font-medium text-gray-700">RUC CLIENTE:</label>
                    <input type="text" className="form-control mt-1 block w-full p-2 border rounded" value={ruc} id="ruc" disabled={!dis} name="ruc" onChange={handleChangeRuc} />
                    {err.ruc && <p className="text-sm text-red-600 mt-1">{err.ruc}</p>}
                </div>
                <div>
                    <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">CIUDAD CLIENTE:</label>
                    <input type="text" className="form-control mt-1 block w-full p-2 border rounded" value={ciudad} id="ciudad" disabled={!dis} name="ciudad" onChange={(e) => setCiudad(e.target.value)} />
                    {err.ciudad && <p className="text-sm text-red-600 mt-1">{err.ciudad}</p>}
                </div>
                <div>
                    <label htmlFor="provincia" className="block text-sm font-medium text-gray-700">PROVINCIA CLIENTE:</label>
                    <input type="text" className="form-control mt-1 block w-full p-2 border rounded" value={provincia} id="provincia" disabled={!dis} name="provincia" onChange={(e) => setProvincia(e.target.value)} />
                    {err.provincia && <p className="text-sm text-red-600 mt-1">{err.provincia}</p>}
                </div>
                <div>
                    <label htmlFor="parroquia" className="block text-sm font-medium text-gray-700">PARROQUIA CLIENTE:</label>
                    <input type="text" className="form-control mt-1 block w-full p-2 border rounded" value={parroquia} id="parroquia" disabled={!dis} name="parroquia" onChange={(e) => setParroquia(e.target.value)} />
                    {err.parroquia && <p className="text-sm text-red-600 mt-1">{err.parroquia}</p>}
                </div>
                <div>
                    <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">DIRECCION CLIENTE:</label>
                    <input type="text" className="form-control mt-1 block w-full p-2 border rounded" value={direccion} id="direccion" disabled={!dis} name="direccion" onChange={(e) => setDireccion(e.target.value)} />
                    {err.direccion && <p className="text-sm text-red-600 mt-1">{err.direccion}</p>}
                </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                <button className="btn1 btn btn-success p-2 bg-green-500 text-white rounded" disabled={!dis} onClick={agregarJson}>AGREGAR CLIENTE</button>
                <button className="btn1 btn btn-danger p-2 bg-red-500 text-white rounded" onClick={() => closeModal(false)}>CERRAR</button>
                </div>
            </div>
            </div>

    )
}