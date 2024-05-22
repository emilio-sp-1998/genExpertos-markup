import React, {useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./LlenarDatos.css"
import { nombreFarmacia } from '../../../../redux/actions/authActions';
import { obtenerFarmacia, obtenerVendedor, listarProductos, enviarMailFormulario, insertarRegistro } from '../../../../redux/actions/pedidosActions';
import NotificationAlert from '../../../common/notifications/NotificationAlert'
import DataTable from 'react-data-table-component';
import ModalProductos from './modals/ModalProductos';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import logo from '../../../../../markup.ico'
import logo2 from '../../../../../genomma-lab.ico'
import swal from 'sweetalert';
import { FaTrash } from 'react-icons/fa';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';

const LlenarDatos = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const columnsInsercion = [
        {
            name: "Code",
            selector: row => row.code
        },
        {
            name: "Id Code",
            selector: row => row.idCode
        },
        {
            name: "Nombre",
            selector: row => row.nombre
        },
        {
            name: "Unidades",
            selector: row => row.unidades
        },
        {
            name: "Margen",
            selector: row => row.margen
        },
        {
            name: "PVP",
            selector: row => row.pvp
        },
        {
            name: "PVF Unitario",
            selector: row => row.pvfunitario
        },
        {
            name: "Subtotal",
            selector: row => row.subtotal
        },
        {
            name: "Acciones",
            cell: row => (
                <button onClick={() => borrarInsercion(row.id)}>
                    <FaTrash />
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ]

    const borrarInsercion = (id) => {
        setDataInsercion(p => p.filter(prod => prod.id !== id))
    }

    const dataInsercionPruebas = [
        {
            id: 1,
            code: 1,
            nombre: "Producto1",
            unidades: 4,
            margen: "16%",
            pvp: "$19.99",
            pvfunitario: "$18.78",
            subtotal: "$69.34"
        },
        {
            id: 2,
            code: 2,
            nombre: "Producto2",
            unidades: 1,
            margen: "4%",
            pvp: "$19.99",
            pvfunitario: "$18.78",
            subtotal: "$17.34"
        }
    ]
    const [dataInsercion, setDataInsercion] = useState([])

    useEffect(() => {
        console.log(dataInsercion)
    }, [dataInsercion])

    const [insertarDataBd, setInsertarDataBd] = useState([])

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

    const [producto, setProducto] = useState({})
    const [porcentaje, setPorcentaje] = useState(0)
    const [subtotal, setSubtotal] = useState(0)
    const [cantidad, setCantidad] = useState(0);

    const [total, setTotal] = useState(0.0);

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
                    setRuc(data.RUC.length === 13 ? data.RUC : "0"+data.RUC)
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

    const insertarRegistroFunc = () => {
        dispatch(insertarRegistro(distribuidorSeleccionado, selectedIdFarmacia, vendedor, dataInsercion)).then((res) => {
            if(res.status){
                if(res.status === 200){
                    console.log("GOOD!!")
                    //mostrarAlerta(true, res.data.code)
                    enviarFormularioACorreo(res.data.code)
                    setSelectedFarmacia('')
                    setSelectedIdFarmacia(-1)
                    setRuc('')
                    setDireccion('')
                    setProvincia('')

                    setProducto('')
                    setCantidad(0)
                }else{
                    console.log("Algo salio mal!!")
                }
            }else{
                console.log("Algo salio mal!!")
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
        setSuggestionsFarmacias(matches)
        setSelectedFarmacia(farmacia)
    }

    const onSuggestHandlerFarmacia = (farmacia, id) => {
        setSelectedFarmacia(farmacia)
        setSelectedIdFarmacia(id)
        setSuggestionsFarmacias([])
    }

    const agregarProductoCola = () => {
        let json = {
            id: dataInsercion.length+1,
            code: producto.SAP,
            idCode: distribuidorSeleccionado === "leterago" ? 
                producto.IDPROD_LETERAGO : distribuidorSeleccionado === "quifatex" ? 
                producto.IDPROD_QUIFATEX : producto.IDPROD_FARMAENLACE,
            nombre: producto.DESCRIPCION,
            unidades: cantidad,
            margen: parseInt(porcentaje*100) + "%",
            pvp: "$"+producto.PVP,
            pvfunitario: "$"+parseFloat(producto.PVP - (producto.PVP*producto.ESCALA_1_UNIDAD)).toFixed(2),
            subtotal: subtotal
        }
        let subTotalConvertido = parseFloat(subtotal)
        let asignarTotal = total + subTotalConvertido;
        setTotal(asignarTotal);
        setDataInsercion([...dataInsercion, json])
        setOpenModal(false)
    }

    const conditionalRowStyles = [
        {
          when: (row) => true,
          style: {
            backgroundColor: 'green',
            color: 'white',
            '&:hover': {
              cursor: 'pointer',
            },
          },
        },
    ];

    const generarPDF = (cod) => {
        const doc = new jsPDF()

        doc.text(`Información del Registro ${cod}`, 60, 20);

        doc.setFontSize(12);

        const encabezado = `
            Distribuidor: ${distribuidorSeleccionado}
            Fecha de Pedido: ${fecha}
            Nombre Farmacia: ${selectedFarmacia}
            Cód. Farmacia: ${selectedIdFarmacia}
            RUC: ${ruc}
            Dirección Farmacia: ${direccion}
            Provincia: ${provincia}
            Vendedor: ${vendedor}
            `;

        // Establecer la posición inicial para el texto del encabezado
        let x = 0;  // Margen izquierdo
        let y = 30;  // Margen superior

        // Añadir el encabezado al documento
        doc.text(encabezado, x, y);

        const columns = ['Code', 'Nombre', 'Unidades', 'Margen', 'Precio Unitario', 'PVF Unitario', 'SubTotal']

        let data = []

        dataInsercion.forEach((item) => {
            let insertData = [`${item.code}`, `${item.nombre}`, `${item.unidades}`,
                `${item.margen}`, `${item.pvp}`, `${item.pvfunitario}`, `${item.subtotal}`
            ]
            data.push(insertData)
        })

        doc.autoTable({
            startY: 100,
            head: [columns],
            body: data
        })

        doc.setFontSize(12);

        doc.text(`Total: ${total}`,20, 140)

        return doc
    }

    const generarPDFTest = () => {
        const doc = new jsPDF()

        doc.text('Productos', 95, 20);

        doc.setFontSize(12);

        const encabezado = `
            Distribuidor: ${distribuidorSeleccionado}
            Fecha de Pedido: ${fecha}
            Nombre Farmacia: ${selectedFarmacia}
            Cód. Farmacia: ${selectedIdFarmacia}
            RUC: ${ruc}
            Dirección Farmacia: ${direccion}
            Provincia: ${provincia}
            Vendedor: ${vendedor}
            `;

        // Establecer la posición inicial para el texto del encabezado
        let x = 0;  // Margen izquierdo
        let y = 30;  // Margen superior

        // Añadir el encabezado al documento
        doc.text(encabezado, x, y);

        const columns = ['Code', 'Nombre', 'Unidades', 'Margen', 'Precio Unitario', 'PVF Unitario', 'SubTotal']

        let data = []

        dataInsercion.forEach((item) => {
            let insertData = [`${item.code}`, `${item.nombre}`, `${item.unidades}`,
                `${item.margen}`, `${item.pvp}`, `${item.pvfunitario}`, `${item.subtotal}`
            ]
            data.push(insertData)
        })

        doc.autoTable({
            startY: 100,
            head: [columns],
            body: data
        })

        doc.save("Productos.pdf")
    }

    const funcPruebas = () => {
        setInsertarDataBd(dataInsercion)
    }

    const reset = () => {
        setDataInsercion([])
        setSelectedFarmacia('')
        setSelectedIdFarmacia(-1)
        setRuc('')
        setDireccion('')
        setProvincia('')

        setProducto('')
        setCantidad(0)
    }

    const tableCustomStyles = {
        headCells: {
          style: {
            fontSize: '20px',
            fontWeight: 'bold',
            paddingLeft: '0 8px',
            justifyContent: 'center',
            backgroundColor: '#7E82D5'
          },
        },
      }

    const enviarFormularioACorreo = (cod) => {
        const asunto = `Fwd: Pedido de transferencia ${vendedor} GenommaLab ${distribuidorSeleccionado}/ Registro ${cod}`
        const cuerpo = `
        Estimado distribuidor.
        <br>
        El siguiente correo es automatizado y corresponde a una solicitud de trasferencia con los datos indicados en el cuerpo del correo.
        <br>
        <br>
        Pedido de transferencia
        <br>
        <br>
        <br>
        <br>
        Distribuidor: ${distribuidorSeleccionado}
        <br>
        Fecha de Pedido: ${fecha}
        <br>
        Nombre Farmacia: ${selectedFarmacia}
        <br>
        Cód. Farmacia: ${selectedIdFarmacia}
        <br>
        RUC: ${ruc}
        <br>
        Dirección Farmacia: ${direccion}
        <br>
        Provincia: ${provincia}
        <br>
        Vendedor: ${vendedor}
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        Saludos.
        Equipo de Automatización MarkUP / Genomma
        Para dudas respecto a la información del correo contactar a Edwin Cepeda 098 9824 751 o responder al correo edwin.cepeda@markup.ws .
        `

        const pdf = generarPDF(cod)
        const pdfBase64 = pdf.output();
        dispatch(enviarMailFormulario(asunto, "jemilio_s@hotmail.com", cuerpo, pdfBase64, `Ventas_${cod}.pdf`)).then((res) => {
            if (!!res.status) if(res.status === 200) {mostrarAlerta(true, cod)} else {mostrarAlerta(false)}
            else mostrarAlerta(false)
        })
        setDataInsercion([])
        setTotal(0);
    }

    const mostrarAlerta = (bool, cod) => {
        if(bool){
            swal({
                title: `Registro ${cod}`,
                text: "El formulario ha sido enviado exitosamente!!",
                icon: "success",
                buttons: "OK"
              })
        }else{
            swal({
                title: "UPS!!!",
                text: "Hubo un inconveniente al enviar la información!!",
                icon: "error",
                buttons: "OK"
              })
        }
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
                    <h1 className='tituloGrande'>Levantamiento de pedidos</h1>
                    <h2 className='tituloGrande'>Proyecto GenExpertos 2024 - MarkUP</h2>
                </div>
            </div>
            <div className="row mt-3">
            <div className="col-md-6">
                <label htmlFor="distribuidor">Seleccionar distribuidor:</label>
                    <select className="form-select" id="distribuidor" value={distribuidorSeleccionado} onChange={handleChange}>
                        <option value="">Seleccionar...</option>
                        <option value="leterago">LETERAGO</option>
                        <option value="quifatex">QUIFATEX</option>
                        {/* <option value="farmaenlace">FARMAENLACE</option> */}
                    </select>
                </div>
                <div className="flex col">
                    <img src={logo}></img>
                </div>
                <div className="flex col">
                    <img src={logo2}></img>
                </div>
                <div className="form-group">
                    <button type="button" className="btn1 btn btn-danger" onClick={() => logout()}>Logout</button>
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
                                value={selectedIdFarmacia === -1 ? "" : selectedIdFarmacia} disabled={true}/>
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
                {/* <div className="form-group">
                    <button type='button' className='btn btn-dark' disabled={dataInsercion.length === 0} onClick={() => insertarRegistroFunc()}>Enviar</button>
                </div> */}
                <div className="form-group">
                    <button type='button' className='btn btn-primary' disabled={false} onClick={() => reset()}>Reset</button>
                </div>
                {/* <div className="form-group">
                    <button type='button' className='btn btn-danger' disabled={dataInsercion.length === 0} onClick={() => generarPDFTest()}>Verificar</button>
                </div> */}
            </div>
            <div className='container mt-5'>
                <DataTable
                    columns={columnsInsercion}
                    data={dataInsercion}
                    customStyles={tableCustomStyles}
                ></DataTable>
            </div>
            <div class="container1">
                <div class="subtotal-container">
                    <span class="label">Total:</span>
                    <span class="amount">${total}</span>
                </div>
            </div>
            <button type='button' className='btn btn-dark' disabled={dataInsercion.length === 0} onClick={() => insertarRegistroFunc()}>Enviar</button>
        </div>
        {openModal && <ModalProductos 
            closeModal={setOpenModal} 
            productosLista={productos} 
            distribuidorSeleccionado={distribuidorSeleccionado}
            productos={producto}
            setProductos={setProducto}
            porcentaje={porcentaje}
            setPorcentaje={setPorcentaje}
            subtotal={subtotal}
            setSubtotal={setSubtotal}
            cantidad={cantidad}
            setCantidad={setCantidad}
            agregarProductoCola={agregarProductoCola}/>}
        </>
    )
}
export default LlenarDatos;