import React, {useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./LlenarDatos.css"
import { nombreFarmacia } from '../../../../redux/actions/authActions';
import { obtenerFarmacia, obtenerVendedor, listarProductos } from '../../../../redux/actions/pedidosActions';
import NotificationAlert from '../../../common/notifications/NotificationAlert'
import ModalProductos from './modals/ModalProductos';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const LlenarDatos = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState(1);
    const [alertMessage, setAlertMessage] = useState("");

    const [distribuidorSeleccionado, setDistribuidorSeleccionado] = useState("");
    const [farmacias, setFarmacias] = useState([]);
    const [productos, setProductos] = useState([]);
    const [selectedFarmacia, setSelectedFarmacia] = useState('');
    const [selectedIdFarmacia, setSelectedIdFarmacia] = useState(-1);
    const [suggestionsFarmacias, setSuggestionsFarmacias] = useState([]);

    const [vendedor, setVendedor] = useState('')

    const [ruc, setRuc] = useState('')
    const [direccion, setDireccion] = useState('')
    const [provincia, setProvincia] = useState('')

    const [fecha, setFecha] = useState('');

    const [openModal, setOpenModal] = useState(false);

    const logout = () => {
        navigate("/logout")
    }

    const handleChange = (event) => {
        setDistribuidorSeleccionado(event.target.value);
        setSelectedFarmacia('')
        setSelectedIdFarmacia(-1)
        setRuc('')
        setDireccion('')
        setProvincia('')
    };

    const fechaActual = () => {
        let today = new Date();
        let year = today.getFullYear();
        let month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11, así que sumamos 1
        let day = String(today.getDate()).padStart(2, '0');
        let formattedDate = `${year}-${month}-${day}`;
        setFecha(formattedDate)
    }

    useEffect(() => {
        fechaActual()
        if(distribuidorSeleccionado !== ""){
            nombreFarmaciaFunc()
            obtenerVendedorFunc()
            listarProductosFunc();
        }
    }, [distribuidorSeleccionado, fecha])

    useEffect(() => {
        if(selectedIdFarmacia !== -1){
            obtenerFarmaciaFunc();
        }
    }, [selectedIdFarmacia])
    
    const obtenerVendedorFunc = () => {
        dispatch(obtenerVendedor(distribuidorSeleccionado)).then((res) => {
            if(res.status){
                if(res.status === 200){
                    const data = res.data;
                    setVendedor(data.vendedor)
                }else if(res.status === 401){
                    navigate("/logout");
                }else{
                    setShowAlert(true);
                    setAlertType(2);
                    setAlertMessage("Ha ocurrido un error, inténtelo de nuevo.");
                }
            }else{
                setShowAlert(true);
                setAlertType(2);
                setAlertMessage("Ha ocurrido un error, inténtelo de nuevo.");
            }
        })
    }

    const listarProductosFunc = () => {
        dispatch(listarProductos(distribuidorSeleccionado)).then((res) => {
            if (res.status) {
                if(res.status === 200){
                    const data = res.data
                    
                    let agregarProducto = []

                    data.forEach((item) => {
                        const json = {
                            id: item.ID,
                            nombre_producto: item.DESCRIPCION
                        }
                        agregarProducto.push(json)
                    })

                    setProductos(agregarProducto)
                }else if(res.status === 401){
                    navigate("/logout");
                }else{
                    setShowAlert(true);
                    setAlertType(2);
                    setAlertMessage("Ha ocurrido un error, inténtelo de nuevo.");
                }
            }else{
                setShowAlert(true);
                setAlertType(2);
                setAlertMessage("Ha ocurrido un error, inténtelo de nuevo.");
            }
        })
    }

    const obtenerFarmaciaFunc = () => {
        dispatch(obtenerFarmacia(distribuidorSeleccionado, selectedIdFarmacia)).then((res) => {
            if (res.status) {
                if(res.status === 200){
                    const data = res.data
                    setRuc(data.RUC)
                    setDireccion(data.DIRECCION)
                    setProvincia(data.PROVINCIA)
                }else if(res.status === 401){
                    navigate("/logout");
                }else{
                    setShowAlert(true);
                    setAlertType(2);
                    setAlertMessage("Ha ocurrido un error, inténtelo de nuevo.");
                }
            }else{
                setShowAlert(true);
                setAlertType(2);
                setAlertMessage("Ha ocurrido un error, inténtelo de nuevo.");
            }
        })
    }

    const nombreFarmaciaFunc = () => {
        dispatch(nombreFarmacia(distribuidorSeleccionado)).then((res) => {
            if (res.status) {
                if(res.status === 200){
                    const data = res.data
                    
                    let agregarFarmacia = []

                    data.forEach((item) => {
                        const json = {
                            idCliente: item.CLIENTE,
                            razon_social: item.RAZON_SOCIAL
                        }
                        agregarFarmacia.push(json)
                    })

                    console.log(agregarFarmacia)

                    setFarmacias(agregarFarmacia)
                }else if(res.status === 401){
                    navigate("/logout");
                }else{
                    setShowAlert(true);
                    setAlertType(2);
                    setAlertMessage("Ha ocurrido un error, inténtelo de nuevo.");
                }
            }else{
                setShowAlert(true);
                setAlertType(2);
                setAlertMessage("Ha ocurrido un error, inténtelo de nuevo.");
            }
        })
    }

    const onChangeHandlerFarmacia = (farmacia) => {
        let matches = []
        if(farmacia.length>0){
            matches = farmacias.filter((farm) => {
                const regex = new RegExp(`${farmacia}`, "gi")
                return farm.razon_social.match(regex)
            })
        }
        matches = matches.slice(0, 10)
        console.log('matches', matches)
        setSuggestionsFarmacias(matches)
        setSelectedFarmacia(farmacia)
    }

    const onSuggestHandlerFarmacia = (farmacia, id) => {
        setSelectedFarmacia(farmacia)
        setSelectedIdFarmacia(id)
        setSuggestionsFarmacias([])
    }

    return(
        <>
        {/* <NotificationAlert
            show={showAlert}
            setShow={setShowAlert}
            message={alertMessage}
            type={alertType}
        /> */}
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
            <div className="myDiv">
                <div className="row mt-3">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="fecha">Fecha:</label>
                            <input type="date" className="form-control" id="fecha" value={fecha} disabled={true}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="fecha">Nombre Farmacia:</label>
                            <input type='text' className='form-control' 
                                disabled={distribuidorSeleccionado ? false : true} 
                                onChange={e => onChangeHandlerFarmacia(e.target.value)}
                                value={selectedFarmacia}></input>
                            {suggestionsFarmacias && suggestionsFarmacias.map((suggestion) => {
                                return(
                                    <div key={suggestion.idCliente}
                                        className='suggestion col-md-12 justify-content-md-center'
                                        onClick={() => onSuggestHandlerFarmacia(suggestion.razon_social, suggestion.idCliente)}
                                    >
                                        {suggestion.razon_social}</div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="fecha">Cod. Farmacia:</label>
                            <input type="text" className="form-control text-center" id="codFarmacia" name="codFarmacia" 
                                value={selectedIdFarmacia === -1 ? '' : selectedIdFarmacia} disabled={true}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="fecha">RUC:</label>
                            <input type="text" className="form-control text-center" id="ruc" name="ruc" value={ruc} disabled={true}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="fecha">Direccion:</label>
                            <input type="text" className="form-control text-center" id="direccion" name="direccion" value={direccion} disabled={true}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="fecha">Provincia:</label>
                            <input type="text" className="form-control text-center" id="provincia" name="provincia" value={provincia} disabled={true}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="fecha">Vendedor:</label>
                            <input type="text" className="form-control text-center" id="vendedor" name="vendedor" value={vendedor} disabled={true}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='buttons-div'>
                <div className="form-group">
                    <button type='button' className='btn btn-success' disabled={selectedIdFarmacia === -1}
                        onClick={() => setOpenModal(true)}>Nuevo</button>
                </div>
                <div className="form-group">
                    <button type='button' className='btn btn-dark' disabled={true}>Enviar</button>
                </div>
            </div>
            <button type="button" className="btn1 btn btn-danger" onClick={() => logout()}>Logout</button>
        </div>
        {openModal && <ModalProductos closeModal={setOpenModal} productosLista={productos} distribuidorSeleccionado={distribuidorSeleccionado}/>}
        </>
    )
}
export default LlenarDatos;