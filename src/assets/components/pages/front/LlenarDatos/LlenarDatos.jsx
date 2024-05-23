import React, {useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./LlenarDatos.css"
import { nombreFarmacia } from '../../../../redux/actions/authActions';
import { obtenerFarmacia, obtenerVendedor, listarProductos, enviarMailFormulario, insertarRegistro, enviarMailFormulario2 } from '../../../../redux/actions/pedidosActions';
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
            name: "PVP Sin IVA",
            selector: row => row.pvpsiniva
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

    const [observacion, setObservacion] = useState('')

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

    useEffect(() => {
        if(observacion){
            console.log("SI!!")
        }else{
            console.log("NO!!")
        }
    }, [observacion])
    
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
        dispatch(insertarRegistro(distribuidorSeleccionado, selectedIdFarmacia, vendedor, dataInsercion, observacion)).then((res) => {
            if(res.status){
                if(res.status === 200){
                    console.log("GOOD!!")
                    //mostrarAlerta(true, res.data.code)
                    setObservacion('')
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
            pvpsiniva: "$"+producto.PVP_SIN_IVA,
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

        var imgData = 'data:image/png;base64,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'
        var imgData2 = 'data:image/png;base64,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'
        doc.addImage(imgData, 'PNG', 40, 10, 50, 25)
        doc.addImage(imgData2, 'PNG', 120, 10, 35, 30)

        doc.text(`Pedido ${cod}`, 80, 60);

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
        let y = 80;  // Margen superior

        // Añadir el encabezado al documento
        doc.text(encabezado, x, y);

        const columns = ['Code', 'Nombre', 'Unidades', 'Margen', 'Precio Unitario', 'PVP Sin IVA', 'SubTotal']

        let data = []

        dataInsercion.forEach((item) => {
            let insertData = [`${item.code}`, `${item.nombre}`, `${item.unidades}`,
                `${item.margen}`, `${item.pvp}`, `${item.pvpsiniva}`, `${item.subtotal}`
            ]
            data.push(insertData)
        })

        doc.autoTable({
            startY: 150,
            head: [columns],
            body: data
        })

        doc.setFontSize(12);

        doc.text(`Total: ${total}`,20, 200)

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
        setObservacion('')
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
        ${observacion ? 
            `<br>
                Observacion: ${observacion}
             <br>` : ''
        }
        <br>
        <br>
        <br>
        <br>
        Saludos.
        Equipo de Automatización MarkUP / Genomma
        Para dudas respecto a la información del correo contactar a Veronica Navarrete 098 0780 407 o responder al correo veronica.navarrete@markup.ws .
        `

        const pdf = generarPDF(cod)
        const pdfBase64 = pdf.output();
        dispatch(enviarMailFormulario(asunto, "jemilio_s@hotmail.com", cuerpo, pdfBase64, `Ventas_${cod}.pdf`)).then((res) => {
            if (!!res.status) if(res.status === 200) {mostrarAlerta(true, cod)} else {mostrarAlerta(false)}
            else mostrarAlerta(false)
        })
        if(distribuidorSeleccionado === "leterago"){
            /* dispatch(enviarMailFormulario2(asunto, "operaciones@innovaservgroup.com", cuerpo, pdfBase64, `Ventas_${cod}.pdf`)).then((res) => {
                if (!!res.status) if(res.status === 200) {console.log("Se envio el correo!!!")} else {console.log("Hubo un error")}
                else console.log("Hubo un error")
            })
            dispatch(enviarMailFormulario2(asunto, "krey@leterago.com.ec", cuerpo, pdfBase64, `Ventas_${cod}.pdf`)).then((res) => {
                if (!!res.status) if(res.status === 200) {console.log("Se envio el correo!!!")} else {console.log("Hubo un error")}
                else console.log("Hubo un error")
            }) */
            dispatch(enviarMailFormulario2(asunto, "jemilio_s@hotmail.com", cuerpo, pdfBase64, `Ventas_${cod}.pdf`)).then((res) => {
                if (!!res.status) if(res.status === 200) {console.log("Se envio el correo!!!")} else {console.log("Hubo un error")}
                else console.log("Hubo un error")
            })
            dispatch(enviarMailFormulario2(asunto, "veronica.navarrete@markup.ws", cuerpo, pdfBase64, `Ventas_${cod}.pdf`)).then((res) => {
                if (!!res.status) if(res.status === 200) {console.log("Se envio el correo!!!")} else {console.log("Hubo un error")}
                else console.log("Hubo un error")
            })
        }else{
            /* dispatch(enviarMailFormulario2(asunto, "transferencias@quifatex.com", cuerpo, pdfBase64, `Ventas_${cod}.pdf`)).then((res) => {
                if (!!res.status) if(res.status === 200) {console.log("Se envio el correo!!!")} else {console.log("Hubo un error")}
                else console.log("Hubo un error")
            })
            dispatch(enviarMailFormulario2(asunto, "mauro.noboa@quifatex.com", cuerpo, pdfBase64, `Ventas_${cod}.pdf`)).then((res) => {
                if (!!res.status) if(res.status === 200) {console.log("Se envio el correo!!!")} else {console.log("Hubo un error")}
                else console.log("Hubo un error")
            }) */
            dispatch(enviarMailFormulario2(asunto, "subzerovega45@gmail.com", cuerpo, pdfBase64, `Ventas_${cod}.pdf`)).then((res) => {
                if (!!res.status) if(res.status === 200) {console.log("Se envio el correo!!!")} else {console.log("Hubo un error")}
                else console.log("Hubo un error")
            })
            dispatch(enviarMailFormulario2(asunto, "veronica.navarrete@markup.ws", cuerpo, pdfBase64, `Ventas_${cod}.pdf`)).then((res) => {
                if (!!res.status) if(res.status === 200) {console.log("Se envio el correo!!!")} else {console.log("Hubo un error")}
                else console.log("Hubo un error")
            })
        }
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
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="fecha">Observacion:</label>
                    <textarea className="form-control" rows="4" cols="50" id="observacion" name="observacion"
                        onChange={(e) => setObservacion(e.target.value)} disabled={selectedIdFarmacia === -1}
                        value={observacion}
                    />
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
                    <button type='button' className='btn btn-danger' disabled={dataInsercion.length === 0} onClick={() => generarPDF("666").save("pruebaGen.pdf")}>Verificar</button>
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