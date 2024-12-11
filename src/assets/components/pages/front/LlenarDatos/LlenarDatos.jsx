import React, {useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./LlenarDatos.css"
import { nombreFarmacia } from '../../../../redux/actions/authActions';
import { obtenerFarmacia, obtenerVendedor, 
    listarProductos, enviarMailFormulario, enviarMailFormularioMultiple, 
    insertarRegistro, enviarMailFormulario2, 
    obtenerUltimoRegistro, listarPDVs, obtenerPdv, 
    listarProductosPdv, actualizarStockGloria } from '../../../../redux/actions/pedidosActions';
import NotificationAlert from '../../../common/notifications/NotificationAlert'
import DataTable from 'react-data-table-component';
import ModalProductos from './modals/ModalProductos';
import AgregarCliente from './modals/AgregarCliente';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import logo from '../../../../../markup.ico'
import logo2 from '../../../../../genomma-lab.ico'
import logo3 from '../../../../../gloria.ico'
import logoGen from '../../../../../genomma.png'
import swal from 'sweetalert';
import { FaTrash } from 'react-icons/fa';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

const LlenarDatos = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth);

    const {VALIDAR_DIST} = useSelector((state) => state.auth.datosUsuario)

    const [distribuidorSeleccionado, setDistribuidorSeleccionado] = useState("");

    const columnsInsercion = [
        {
            name: "Code",
            selector: row => row.code
        },
        distribuidorSeleccionado !== "genomma" && (
            {
                name: "Id Code",
                selector: row => row.idCode
            }
        ),
        {
            name: "Descripción",
            selector: row => row.nombre,
            width: "280px",
        },
        distribuidorSeleccionado === "genomma" && (
            {
                name: "UMEP",
                selector: row => row.umep
            }
        ),
        distribuidorSeleccionado === "genomma" && (
            {
                name: "UMB",
                selector: row => row.umb
            }
        ),
        distribuidorSeleccionado === "genomma" && (
            {
                name: "BONIF",
                selector: row => row.bonif
            }
        ),
        {
            name: `${distribuidorSeleccionado !== "genomma" ? "PVF" : "Costo"}`,
            selector: row => row.pvpsiniva
        },
        {
            name: "Unidades",
            selector: row => row.unidades
        },
        {
            name: "Subtotal Sin Descuento",
            selector: row => row.solosubtotal
        },
        auth.datosUsuario.RUC_CUENTA == '1790663973001' && (
            {
                name: "Stock Restante",
                selector: row => row.stock
            }
        ),
        {
            name: "Descuento",
            selector: row => row.margen
        },
        auth.datosUsuario.RUC_CUENTA == '1790663973001' && (
            {
                name: "Valor Descuento",
                selector: row => row.valorDesc
            }
        ),
        {
            name: "Subtotal",
            selector: row => row.subtotal
        },
        {
            name: "IVA%",
            selector: row => row.ivaporcentaje
        },
        {
            name: "IVA",
            selector: row => row.totaliva.toFixed(2)
        },
        auth.datosUsuario.RUC_CUENTA != '1790663973001' && (
            {
                name: "TOTAL",
                selector: row => row.total
            }
        ),
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
        const elemento = dataInsercion.find(objeto => objeto.id === id);
        setTotal(total-elemento.subtotal)
        setSumaIva(sumaIva - parseFloat(elemento.totaliva))
        setDataInsercion(p => p.filter(prod => prod.id !== id))
        if(elemento.marca === "SUEROX" && elemento.tipoProducto === "leterago"){
            setSumaSuerox(sumaSuerox-parseInt(elemento.unidades))
            setRestaSuerox(true)
        }
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

    const [insertarDataBd, setInsertarDataBd] = useState([])

    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState(1);
    const [alertMessage, setAlertMessage] = useState("");

    const [farmacias, setFarmacias] = useState([]);
    const [pdvs, setPdvs] = useState([]);
    const [productos, setProductos] = useState([]);
    const [selectedFarmacia, setSelectedFarmacia] = useState('');
    const [selectedIdFarmacia, setSelectedIdFarmacia] = useState(-1);
    const [suggestionsFarmacias, setSuggestionsFarmacias] = useState([]);

    const [selectedPdv, setSelectedPdv] = useState('');
    const [selectedIdPdv, setSelectedIdPdv] = useState(-1);
    const [selectedIdPdv2, setSelectedIdPdv2] = useState("");
    const [suggestionsPdv, setSuggestionsPdv] = useState([]);

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

    const [sumaIva, setSumaIva] = useState(0.0)

    const [fecha, setFecha] = useState('');

    const [openModal, setOpenModal] = useState(false);
    const [openAgregarCliente, setOpenAgregarCliente] = useState(false);

    const [sumaSuerox, setSumaSuerox] = useState(0.0)
    const [restaSuerox, setRestaSuerox] = useState(false);

    useEffect(() => {
        console.log(auth);
        if(auth.datosUsuario.RUC_CUENTA == '1790663973001'){
            nombrePDVFunc()
        }
    }, [])

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
        setDataInsercion([])
        setTotal(0)
        setSumaIva(0)
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
        if(selectedIdPdv !== -1){
            obtenerPdvFunc()
        }
    }, [selectedIdPdv])

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

    const listarProductosPdvFunc = () => {
        dispatch(listarProductosPdv("1790663973001")).then((res) => {
            if(res.status){
                if(res.status === 200){
                    const data = res.data
                    
                    let agregarProducto = []

                    data.forEach((item) => {
                        const json = {
                            id: item.COD_PRODUCTO,
                            nombre_producto: item.NOMBRE_PRODUCTO,
                            stock: item.STOCK
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
                    if(data.RUC) setRuc(data.RUC.length === 13 ? data.RUC : "0"+data.RUC)
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

    const obtenerPdvFunc = () => {
        dispatch(obtenerPdv(selectedIdPdv)).then((res) => {
            if (res.status) {
                if(res.status === 200){
                    const data = res.data
                    setRuc(data.RUC)
                    setSelectedIdPdv2(data.COD_PDV)
                    setDireccion(data.COMPLEMENTO_DIRECCION)
                    setProvincia(data.PROVINCIA)
                    setVendedor(auth.datosUsuario.NOMBRE_VENDEDOR)
                    listarProductosPdvFunc()
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

    const obtenerUltimoRegistroFunc = () => {
        dispatch(obtenerUltimoRegistro()).then((res) => {
            if (res.status) {
                if (res.status === 200) {
                    const data = res.data
                    enviarFormularioACorreo(data.code)
                } else if (res.status === 401){
                    navigate("/logout");
                } else {
                    setShowAlert(true);
                    setAlertType(2);
                    setAlertMessage("Ha ocurrido un error, inténtelo de nuevo.");
                }
            } else {
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
                        console.log(item)
                        item.RUC = item.RUC ? item.RUC : ""
                        const json = {
                            idCliente: item.CLIENTE,
                            razon_social: item.CLIENTE ? item.CLIENTE +" - "+item.NOMBRE_PDV+" - "+(item.RUC.length === 13 ? item.RUC : "0"+item.RUC) :
                                            item.NOMBRE_PDV+" - "+(item.RUC.length === 13 ? item.RUC : "0"+item.RUC)
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

    const nombrePDVFunc = () => {
        dispatch(listarPDVs("LECHE GLORIA")).then((res) => {
            if (res.status) {
                if(res.status === 200){
                    const data = res.data
                    
                    let agregarPDV = []

                    data.forEach((item) => {
                        const json = {
                            idCliente: item.ID_INVOLVES                            ,
                            razon_social: item.ID_INVOLVES ? item.ID_INVOLVES +" - "+item.NOMBRE_PDV+" - "+item.RUC :
                                            item.NOMBRE_PDV+" - "+item.RUC
                        }
                        agregarPDV.push(json)
                    })

                    setPdvs(agregarPDV)
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

    const actualizarStockGloriaFunc = (arrayProducto) => {
        dispatch(actualizarStockGloria(arrayProducto)).then((res) => {
            if(res.status){ if(res.status === 200){ mostrarAlerta(true, "xd", "Gloria") } 
            else {mostrarAlerta(false, "Hubo un inconveniente al enviar al correo el pedido!!")} } 
            else {mostrarAlerta(false, "Hubo un inconveniente al enviar al correo el pedido!!")}
        })
    }

    const insertarRegistroFunc = () => {
        dispatch(insertarRegistro(distribuidorSeleccionado, auth.datosUsuario.RUC_CUENTA != "1790663973001" ? selectedIdFarmacia : selectedIdPdv2, vendedor, dataInsercion, sumaIva.toFixed(2), 
            total.toFixed(2), ((parseFloat(total)+parseFloat(sumaIva)).toFixed(2)), observacion, auth.datosUsuario.RUC_CUENTA)).then((res) => {
            if(res.status){
                if(res.status === 200){
                    console.log("GOOD!!")
                    //mostrarAlerta(true, res.data.code)
                    console.log(dataInsercion)
                    setObservacion('')
                    if(auth.datosUsuario.RUC_CUENTA != "1790663973001") enviarFormularioACorreo(res.data.code)
                    else enviarCorreoOtro(res.data.code)
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

    const onChangeHandlerPDV = (pdv) => {
        let matches = []
        if(pdv.length>0){
            matches = pdvs.filter((farm) => {
                const regex = new RegExp(`${pdv}`, "gi")
                return farm.razon_social.match(regex)
            })
        }
        matches = matches.slice(0, 10)
        setSuggestionsPdv(matches)
        setSelectedPdv(pdv)
    }

    const onSuggestHandlerFarmacia = (farmacia, id) => {
        setSelectedFarmacia(farmacia)
        setSelectedIdFarmacia(id)
        setSuggestionsFarmacias([])
    }

    const onSuggestHandlerPdv = (pdv, id) => {
        setSelectedPdv(pdv)
        setSelectedIdPdv(id)
        setSuggestionsPdv([])
    }

    const agregarProductoCola = () => {
        const soloSubTotal = (producto.PVP_SIN_IVA*cantidad).toFixed(2)
        const t = subtotal*producto.IVA
        console.log(t)
        let json = auth.datosUsuario.RUC_CUENTA != "1790663973001" ? {
            id: dataInsercion.length === 0 ? dataInsercion.length+1 : dataInsercion[dataInsercion.length-1].id+1,
            tipoProducto: distribuidorSeleccionado,
            code: producto.SAP,
            idCode: distribuidorSeleccionado === "leterago" ? 
                producto.IDPROD_LETERAGO : distribuidorSeleccionado === "quifatex" ? 
                producto.IDPROD_QUIFATEX : (distribuidorSeleccionado === "difare" || distribuidorSeleccionado === "difare_franquicia") ? 
                producto.IDPROD_DIFARE : distribuidorSeleccionado === "genomma" ? 
                producto.IDPROD_GENOMMA : producto.IDPROD_FARMAENLACE,
            nombre: producto.DESCRIPCION,
            unidades: cantidad,
            marca: producto.MARCA,
            margen: parseInt(porcentaje*100) + "%",
            ivaporcentaje: parseInt(producto.IVA*100) + "%",
            totaliva: subtotal*producto.IVA,
            solosubtotal: "$"+soloSubTotal,
            pvp: "$"+producto.PVP_CON_IVA,
            pvpsiniva: "$"+producto.PVP_SIN_IVA.toFixed(2),
            subtotal: subtotal,
            valorDesc: (soloSubTotal*porcentaje).toFixed(2),
            total: (parseFloat(subtotal)+t).toFixed(2),
            umep: 12,
            umb: "UND",
            bonif: "0.00"
        } : {
            id: dataInsercion.length === 0 ? dataInsercion.length+1 : dataInsercion[dataInsercion.length-1].id+1,
            code: producto.COD_PRODUCTO,
            nombre: producto.NOMBRE_PRODUCTO,
            unidades: cantidad,
            marca: producto.MARCA,
            margen: "0%",
            ivaporcentaje: parseInt(producto.IVA*100) + "%",
            totaliva: subtotal*producto.IVA,
            solosubtotal: "$"+(producto.PVP_SIN_IVA*cantidad).toFixed(2),
            pvp: "$"+producto.PVP_CON_IVA,
            pvpsiniva: "$"+producto.PVP_SIN_IVA,
            subtotal: subtotal,
            stock: producto.STOCK
        }
        let subTotalConvertido = parseFloat(subtotal)
        let asignarTotal = total + subTotalConvertido;
        let sumaIvaConvertido = parseFloat(subtotal*producto.IVA)
        let asignarSumaIva = sumaIva + sumaIvaConvertido
        setSumaIva(asignarSumaIva);
        setTotal(asignarTotal);
        setDataInsercion([...dataInsercion, json])
        setProducto({})
        setPorcentaje(0)
        setCantidad(0)
        setOpenModal(false)
    }

    useEffect(() => {
        const sueroxProductos = dataInsercion.filter(elemento => elemento.marca === "SUEROX" && elemento.tipoProducto === "leterago")
        let suma = 0
        sueroxProductos.forEach((item) => {
            if(!restaSuerox) {
                suma += parseInt(item.unidades)
                setSumaSuerox(suma)
            }
            console.log("xdddd", dataInsercion)
        })
        if(restaSuerox) setRestaSuerox(false)
        console.log(dataInsercion)
    }, [dataInsercion])

    useEffect(() => {
        const sueroxProductos = dataInsercion.filter(elemento => elemento.marca === "SUEROX" && elemento.tipoProducto === "leterago")
        if(sumaSuerox < 6){
            let totalCambio = parseFloat(total)
            let totalIVA = parseFloat(sumaIva)
            sueroxProductos.forEach((item) => {
                const quitarValor = totalCambio - parseFloat(item.subtotal)
                const quitarIva = totalIVA - parseFloat(item.totaliva)
                setTotal(quitarValor.toFixed(2))
                setSumaIva(quitarIva.toFixed(2))
                console.log("Quitar Valor M: "+ quitarValor.toFixed(2))
                const index = dataInsercion.findIndex(p => p.idCode === item.idCode)
                if (index !== -1) {
                    dataInsercion[index].margen = "16%"
                    let valorConDolar = item.solosubtotal;
                    let valorSinDolar = valorConDolar.replace('$', ''); // Elimina el signo de dólar
                    let valorFloat = parseFloat(valorSinDolar).toFixed(2);
                    let sub = (valorFloat - valorFloat*0.16).toFixed(2)
                    dataInsercion[index].subtotal = sub
                    dataInsercion[index].totaliva = sub*0.15
                    const añadirValor = quitarValor + parseFloat(sub)
                    const añadirIva = quitarIva + parseFloat(sub*0.15)
                    totalCambio = añadirValor
                    totalIVA = añadirIva
                    setTotal(añadirValor)
                    setSumaIva(añadirIva)
                    console.log("Añadir valor: "+ añadirValor)
                    console.log(valorFloat)
                }
            })
        }
        else if(sumaSuerox >= 6 && sumaSuerox < 12){
            let totalCambio = parseFloat(total)
            let totalIVA = parseFloat(sumaIva)
            sueroxProductos.forEach((item) => {
                const quitarValor = totalCambio - parseFloat(item.subtotal)
                const quitarIva = totalIVA - parseFloat(item.totaliva)
                setTotal(quitarValor.toFixed(2))
                setSumaIva(quitarIva.toFixed(2))
                console.log("Quitar Valor: "+ quitarValor.toFixed(2))
                const index = dataInsercion.findIndex(p => p.idCode === item.idCode)
                if (index !== -1) {
                    dataInsercion[index].margen = "26%"
                    let valorConDolar = item.solosubtotal;
                    let valorSinDolar = valorConDolar.replace('$', ''); // Elimina el signo de dólar
                    let valorFloat = parseFloat(valorSinDolar).toFixed(2);
                    let sub = (valorFloat - valorFloat*0.26).toFixed(2)
                    dataInsercion[index].subtotal = sub
                    dataInsercion[index].totaliva = sub*0.15
                    console.log("asdasdas: "+ sub)
                    const añadirValor = quitarValor + parseFloat(sub)
                    const añadirIva = quitarIva + parseFloat(sub*0.15)
                    totalCambio = añadirValor
                    totalIVA = añadirIva
                    setTotal(añadirValor)
                    setSumaIva(añadirIva)
                    console.log("Añadir valor: "+ añadirValor)
                    console.log(sumaIva)
                }
            })
        } /* else if(sumaSuerox >= 26 && sumaSuerox < 36){
            let totalCambio = parseFloat(total)
            let totalIVA = parseFloat(sumaIva)
            sueroxProductos.forEach((item) =>{
                const quitarValor = totalCambio - parseFloat(item.subtotal)
                const quitarIva = totalIVA - parseFloat(item.totaliva)
                setTotal(quitarValor.toFixed(2))
                setSumaIva(quitarIva.toFixed(2))
                console.log("Quitar Valor: "+ quitarValor.toFixed(2))
                const index = dataInsercion.findIndex(p => p.idCode === item.idCode)
                if (index !== -1) {
                    dataInsercion[index].margen = "30%"
                    let valorConDolar = item.solosubtotal;
                    let valorSinDolar = valorConDolar.replace('$', ''); // Elimina el signo de dólar
                    let valorFloat = parseFloat(valorSinDolar).toFixed(2);
                    let sub = (valorFloat - valorFloat*0.3).toFixed(2)
                    dataInsercion[index].subtotal = sub
                    dataInsercion[index].totaliva = sub*0.15
                    console.log("asdasdas: "+ sub)
                    const añadirValor = quitarValor + parseFloat(sub)
                    const añadirIva = quitarIva + parseFloat(sub*0.15)
                    totalCambio = añadirValor
                    totalIVA = añadirIva
                    setTotal(añadirValor)
                    setSumaIva(añadirIva)
                    console.log("Añadir valor: "+ añadirValor)
                    console.log(sumaIva)
                }
            })
        } */ else{
            let totalCambio = parseFloat(total)
            let totalIVA = parseFloat(sumaIva)
            sueroxProductos.forEach((item) =>{
                const quitarValor = totalCambio - parseFloat(item.subtotal)
                const quitarIva = totalIVA - parseFloat(item.totaliva)
                setTotal(quitarValor.toFixed(2))
                setSumaIva(quitarIva.toFixed(2))
                console.log("Quitar Valor: "+ quitarValor.toFixed(2))
                const index = dataInsercion.findIndex(p => p.idCode === item.idCode)
                if (index !== -1) {
                    dataInsercion[index].margen = "33%"
                    let valorConDolar = item.solosubtotal;
                    let valorSinDolar = valorConDolar.replace('$', ''); // Elimina el signo de dólar
                    let valorFloat = parseFloat(valorSinDolar).toFixed(2);
                    let sub = (valorFloat - valorFloat*0.33).toFixed(2)
                    dataInsercion[index].subtotal = sub
                    dataInsercion[index].totaliva = sub*0.15
                    console.log("asdasdas: "+ sub)
                    const añadirValor = quitarValor + parseFloat(sub)
                    const añadirIva = quitarIva + parseFloat(sub*0.15)
                    totalCambio = añadirValor
                    totalIVA = añadirIva
                    setTotal(añadirValor)
                    setSumaIva(añadirIva)
                    console.log("Añadir valor: "+ añadirValor)
                    console.log(sumaIva)
                }
            })
        }
        console.log("SUMAAA: "+ sumaSuerox)
    }, [sumaSuerox])

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
        // Crear un nuevo documento jsPDF
        var imgData = "data:image/png;base64,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";
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a3'
          });

        // Agregar encabezado
            doc.setFontSize(10);
            doc.addImage(imgData, 'PNG', 20, 3, 80, 15)
            doc.text('GENOMMA LAB', 14, 26);
            doc.text('R.U.C 0992414499001', 14, 31);

            // Información de la orden de compra
            doc.setFontSize(20);
            doc.text('PEDIDO #', 150, 15); // No se modifica
            doc.text(cod, 190, 15); // No se modifica
            doc.setFontSize(10);
            doc.text('MATRIZ', 100, 22);
            doc.text('Encargado/a', 90, 30);
            doc.text('Veronica Navarrete', 120, 30);
            doc.text('Teléfono:', 90, 34);
            doc.text('098 0780 407', 120, 34);
            doc.text('Quito, 2024/07/23', 260, 32);
            // Obtener el ancho del documento
            const width = doc.internal.pageSize.getWidth();

            // Establecer el grosor de la línea
            doc.setLineWidth(1);

            // Dibujar una línea horizontal
            doc.line(10, 44, width - 10, 44);
            doc.text('Distribuidor:', 14, 51); // Subido 10 unidades
            doc.text(distribuidorSeleccionado.toLocaleUpperCase(), 50, 51); // Subido 10 unidades
            doc.text('R.U.C:', 14, 56); // Subido 10 unidades
            doc.text(ruc, 50, 56); // Subido 10 unidades
            doc.text('Direccion:', 14, 60)
            doc.text(direccion, 50, 60); // Subido 10 unidades
            doc.text('FARMACIA:', 14, 72); // Subido 10 unidades
            doc.text(selectedFarmacia, 50, 72); // Subido 10 unidades
            doc.text('CODIGO FARMACIA:', 14, 77); // Subido 10 unidades
            doc.text(selectedIdFarmacia, 50, 77); // Subido 10 unidades

            // Información de contacto ajustada
            doc.text('CONTACTO: Veronica Navarrete', 200, 51); // Subido 10 unidades
            doc.text('Teléfono:', 200, 56); // Subido 10 unidades
            doc.text('098 0780 407', 230, 56); // Subido 10 unidades
            /* doc.text('FAX:', 200, 61); // Subido 10 unidades
            doc.text('0992197358/0992197358', 230, 61); // Subido 10 unidades */

            // Información de entrega ajustada
            doc.text('FECHA PEDIDO:', 200, 71); // Subido 10 unidades
            doc.text(fecha, 260, 71); // Subido 10 unidades

        // Datos de la tabla
        const columns = ['Code', 'Nombre', 'PVF', 'Unidades', 'SubTotal Sin Descuento', 'Descuento', 'Valor Descuento', 'SubTotal', 'IVA', 'Total']

        let data = []

        dataInsercion.forEach((item) => {
            let insertData = [`${item.code}`, `${item.nombre}`, `${item.pvpsiniva}`, `${item.unidades}`, `${item.solosubtotal}`,
                `${item.margen}`, `${item.valorDesc}`, `${item.subtotal}`, `${item.totaliva.toFixed(2)}`, `${item.total}`
            ]
            data.push(insertData)
        })

        doc.autoTable({
            startY: 86,
            head: [columns],
            body: data,
            didDrawPage: function (data) {
                // data.cursor.y te da la posición Y final después de dibujar la tabla
                let finalY = data.cursor.y;
        
                // Línea de separación
                doc.setLineWidth(0.5);
                doc.line(10, 130, width - 10, 130);

                // Textos de la tabla
                let startY = 140; // Empezamos después de la línea de separación

                doc.text('OBSERVACIONES:', 10, startY);
                doc.text(observacion, 50, startY, {maxWidth: 210});


                /* doc.line(20, 195, 80, 195);
                doc.text('FIRMA COMPRADOR', 30, startY + 60);
                doc.line(120, 195, 170, 195);
                doc.text('FIRMA PROVEEDOR', 130, startY + 60); */

                /* doc.text('Descto (-):', 150, startY + 20);
                doc.text('0.00', 180, startY + 20); */

                /* doc.text(`SUMA IVA 15%:`, 150, startY + 30);
                doc.text('4,013.19', 180, startY + 30); */

                doc.text('SUMA IVA 15%:', 350, startY + 40);
                doc.text(`$${sumaIva.toFixed(2)}`, 380, startY + 40);

                /* doc.text('Imp Verde:', 150, startY + 50);
                doc.text('0.00', 180, startY + 50); */

                /* doc.text('IVA:', 150, startY + 60);
                doc.text('1,573.53', 180, startY + 60); */

                doc.text('SubTotal:', 350, startY + 50);
                doc.text(`$${total.toFixed(2)}`, 380, startY + 50);

                doc.line(340, startY + 55, 400, startY + 55);

                doc.text('TOTAL:', 350, startY + 60);
                doc.text(`$${(total + sumaIva).toFixed(2)}`, 380, startY + 60);

                /* doc.text('RECUERDE: LA ORDEN DE COMPRA DEBE SER IGUAL A LA FACTURA EMITIDA POR EL PROVEEDOR EN CANTIDAD, VALOR Y POLÍTICA DE NEGOCIACIÓN. DE NO CUMPLIR CON LO REQUERIDO SE EMITA UNA NOTA DE CRÉDITO.', 10, startY + 90);

                doc.text('"MEJORANDO LA CALIDAD DE NUESTROS PROCESOS Y SERVICIOS"', 10, startY + 110); */

            }
        })

        // Guardar el PDF
        return doc
    }

    const generarPDFPrimax = (cod) => {
        // Crear un nuevo documento jsPDF
        var imgData = "data:image/png;base64,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"
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a3'
          });

        // Agregar encabezado
            doc.setFontSize(10);
            doc.addImage(imgData, 'PNG', 20, 3, 80, 15)
            doc.text('ATIMASA S.A.', 14, 26);
            doc.text('R.U.C 0991331859001', 14, 31);

            // Información de la orden de compra
            doc.setFontSize(20);
            doc.text('ORDEN DE COMPRA #', 150, 15); // No se modifica
            doc.text(cod, 260, 15); // No se modifica
            doc.setFontSize(10);
            doc.text('Quito, Av. 12 de Octubre y Lizardo Garcia', 90, 30);
            doc.text('Teléfono: 04 2 590230', 90, 34);
            doc.text('Quito, 2024/07/23', 260, 32);
            // Obtener el ancho del documento
            const width = doc.internal.pageSize.getWidth();

            // Establecer el grosor de la línea
            doc.setLineWidth(1);

            // Dibujar una línea horizontal
            doc.line(10, 44, width - 10, 44);
            doc.text('Proveedor:', 14, 51); // Subido 10 unidades
            doc.text('GENOMMALAB ECUADOR S.A', 50, 51); // Subido 10 unidades
            doc.text('R.U.C:', 14, 56); // Subido 10 unidades
            doc.text("0992414499001", 50, 56); // Subido 10 unidades
            doc.text('Direccion:', 14, 60)
            doc.text("AV. JOSÉ S CASTILLO Y JUSTINO CORNEJO", 50, 60); // Subido 10 unidades
            doc.text('LOCAL:', 14, 72); // Subido 10 unidades
            doc.text(selectedFarmacia, 50, 72); // Subido 10 unidades
            doc.text('DIRECCIÓN LOCAL: ', 5, 77); // Subido 10 unidades
            doc.text(direccion, 50, 77); // Subido 10 unidades

            // Información de contacto ajustada
            doc.text('CONTACTO: Stephanie Corral', 300, 51); // Subido 10 unidades
            doc.text('Teléfono:', 300, 56); // Subido 10 unidades
            doc.text('CORREO ELECTRÓNICO:', 300, 61); // Subido 10 unidades

            // Información de entrega ajustada
            doc.text('FECHA PEDIDO:', 300, 71); // Subido 10 unidades
            doc.text(fecha, 360, 71); // Subido 10 unidades

        // Datos de la tabla
        const columns = ['Codigo', 'Descripción', 'UMEP', 'UMB', 'Unidades', 'V/UNIT', 'SubTotal Sin Descuento', 'Descuento', 'Valor Descuento', 'SubTotal', 'IVA', 'Total']

        let data = []

        dataInsercion.forEach((item) => {
            let insertData = [`${item.code}`, `${item.nombre}`, `12`, `UND`, `${item.unidades}`, `${item.pvpsiniva}`, `${item.solosubtotal}`,
                `${item.margen}`, `${item.valorDesc}`, `${item.subtotal}`, `${item.totaliva.toFixed(2)}`, `${item.total}`
            ]
            data.push(insertData)
        })

        doc.autoTable({
            startY: 86,
            head: [columns],
            body: data,
            didDrawPage: function (data) {
                // data.cursor.y te da la posición Y final después de dibujar la tabla
                let finalY = data.cursor.y;
        
                // Línea de separación
                doc.setLineWidth(0.5);
                doc.line(10, 130, width - 10, 130);

                // Textos de la tabla
                let startY = 140; // Empezamos después de la línea de separación

                doc.text('OBSERVACIONES:', 10, startY);
                doc.text(observacion, 50, startY, {maxWidth: 210});


                /* doc.line(20, 195, 80, 195);
                doc.text('FIRMA COMPRADOR', 30, startY + 60);
                doc.line(120, 195, 170, 195);
                doc.text('FIRMA PROVEEDOR', 130, startY + 60); */

                /* doc.text('Descto (-):', 150, startY + 20);
                doc.text('0.00', 180, startY + 20); */

                /* doc.text(`SUMA IVA 15%:`, 150, startY + 30);
                doc.text('4,013.19', 180, startY + 30); */

                doc.text('SUMA IVA 15%:', 350, startY + 40);
                doc.text(`$${sumaIva.toFixed(2)}`, 380, startY + 40);

                /* doc.text('Imp Verde:', 150, startY + 50);
                doc.text('0.00', 180, startY + 50); */

                /* doc.text('IVA:', 150, startY + 60);
                doc.text('1,573.53', 180, startY + 60); */

                doc.text('SubTotal:', 350, startY + 50);
                doc.text(`$${total.toFixed(2)}`, 380, startY + 50);

                doc.line(340, startY + 55, 400, startY + 55);

                doc.text('TOTAL:', 350, startY + 60);
                doc.text(`$${(total + sumaIva).toFixed(2)}`, 380, startY + 60);

                /* doc.text('RECUERDE: LA ORDEN DE COMPRA DEBE SER IGUAL A LA FACTURA EMITIDA POR EL PROVEEDOR EN CANTIDAD, VALOR Y POLÍTICA DE NEGOCIACIÓN. DE NO CUMPLIR CON LO REQUERIDO SE EMITA UNA NOTA DE CRÉDITO.', 10, startY + 90);

                doc.text('"MEJORANDO LA CALIDAD DE NUESTROS PROCESOS Y SERVICIOS"', 10, startY + 110); */

            }
        })

        // Guardar el PDF
        return doc
    }

    /* const generarPDF = (cod) => {
        const doc = new jsPDF({
            orientation: 'portrait', // 'portrait' o 'landscape'
            unit: 'mm',
            format: 'a3' // Puedes usar 'a3' para tamaño A3
          })

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

        const columns = ['Code', 'Nombre', 'PVF', 'Unidades', 'SubTotal Sin Descuento', 'Descuento', 'Valor Descuento', 'SubTotal', 'IVA', 'Total']

        let data = []

        dataInsercion.forEach((item) => {
            let insertData = [`${item.code}`, `${item.nombre}`, `${item.pvpsiniva}`, `${item.unidades}`, `${item.solosubtotal}`,
                `${item.margen}`, `${item.valorDesc}`, `${item.subtotal}`, `${item.totaliva.toFixed(2)}`, `${item.total}`
            ]
            data.push(insertData)
        })

        doc.autoTable({
            startY: 150,
            head: [columns],
            body: data,
            columnStyles: {
                0: {
                    columnWidth: 17
                },
                3: {
                    columnWidth: 15
                },
                6: {
                    columnWidth: 10
                },
                8: {
                    columnWidth: 20
                }
            },
            didDrawPage: function (data) {
                // data.cursor.y te da la posición Y final después de dibujar la tabla
                let finalY = data.cursor.y;
        
                // Ajustar el tamaño de la fuente
                doc.setFontSize(12);
        
                // Dibujar los textos de IVA, Subtotal y Total debajo de la tabla
                doc.text(`IVA: $${sumaIva.toFixed(2)}`, 20, finalY + 10);
                doc.text(`Subtotal: $${total.toFixed(2)}`, 20, finalY + 20);
                doc.text(`Total: $${(total + sumaIva).toFixed(2)}`, 20, finalY + 30);
            }
        })

        return doc
    } */

    const generarPDFOtro = (cod) => {
        const doc = new jsPDF()

        var imgData = 'data:image/png;base64,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'
        var imgData2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAChCAMAAABK+nL1AAAC+lBMVEXfGhrsGxvfGRneFRbdDQ7dCwrdCgreERLfGBnfGxveExTeEBHfGBjfFxfgHRnmSkTrc2rwkorynZXuh33qaGDjNzLmTEflQzviLijkOzTnUEjhJCHkPjjgIR3dDQveEQ7qbGTeFBH508z///7////98u70s6vzqZ/++PT86OT4zsbtf3b1urHdBwfzpKTkQTj++/b74NniMSn1uLD+9vH3xb7pYFj86+blRz/zrKP2wrn1vLPzqqH//Pr75t//+/jyoZnhKiX63dfseHDdCQnuhHv4ysP97On2vr32vbjeDw/jNC70sKfcAgL7493vjYTnVEv//v/97+r62NTfGhXqZV3ypJ7xlo3oWVH2v7Xrb27vi4DhKCL74+DuHBz8HR3eGRneGhrmGhreGxtHcEweKk0fK08eKk0hLVMjL1cfKk4fKk4hLFIfKk4eKU4eKU0cKEwaJksbJ0sZJUoYI0gWIUcUIEYZJEkcJ0wdJ00SHkQQHEIOGUARHEMUH0UaJEoPG0EgK08kLVEjLVEkLlIiK1ASHUQgKk4rNFc3P2FESmpLUW9ASGgxOVsVIEYgKk8TH0UzO11ZXnt3e5Oana6trr2ztMLBws3Dw861tsSys8GoqrqXmqx6fZVcYX1gZYDa2uHY2N/b2+KTlakpMlVWW3iLjqLT09zr6+/y8fT49/n8+/339vjx8PPc3OK4ucaQk6dXXHm7vMjQ0NmjpLV1eZFITm1aYHzGxtHExNBSWHUXIkjLzNXt7PCsrbxwdY01PV/i4ujk5OlpbocuN1mHi6CqrLttcov6+ftFTWw8RGRna4YTH0T+/v45QWKvsL5/g5kPG0KOkaWFiJ5eYn7n5+zOztdiZ4LJydOChZsMGD9vc4z7+vxMU3H29fdyd4/e3uVPVXPg4Oacn7DW1t6VmKvv7/K+v8tlaoRJT2708/bm5epscIomMFOlp7cJFTw+RmYcJkt8gJexssBUWnfp6e2GjKCgobIADDWsrr0EETkeKU0gK1AfK0/mJseTAAAA/nRSTlP//6f///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+zjZFdAGxvR///sf//p////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+HmkyoK0usAABTaSURBVHgB7NoHU+pKG8Dx533TNhuCFenEyAMH4WClnGaPXbArWL7/17juJippcsZTyL3jb2pmlpT/pCwQ+PCz/vd/+K/4iPUR6yOWIEoyIykEAqlUfKXRGARRRIaqzgecBS8yuCYBQhGF75OkxSIVS5fjY+MTk5OTU9MJUVMDhyRmxp7NJFOCLPiHxdJszExC5/kTGWfBI5Ydm3lZUy5fUFQIJBrp2ad9mpjNmQUSmViqYo7PFdFWKicK4EcKn7D4ojJfrcV9B0mMz2wMfuLHVl94XXBRFpcG1rQ8uSIG1dKlsdUGcpVmq0DVaMRStfwqDmh/EdWAWF/R7Vue+mJ9R+brcyzmR0CsNRy0ngzYnmBMbeCrTZ2qkYhF4010Wd9SAmL9QA/fOcPOLN5nIFbwmYUu277sQKQJdCmbehRikcImekxKPxNrY1H79VjcjgUecgs9dq0oxBIzReQae3sV5EopGhZr/+DgYA5tNeuXYs0dVhvIHR55xgjxbbQVi2hrHCujj0UKZeROjg0jvYfcuBwWq9yRRHO64pyAvxRrrGMm7O7dvAAu8ixypVout9NG7tQafSxlpYTMN0MkxEo1cGN59TQZematGjqhhaqdVyS/EutMjHVa5/jk4lgJfFJUzjpHWid5gczllT7yWNI1MsWMrLIDmR7P5QsWVcNjERCM6q+fWSwWiItrQbHo1j4yN3W21DlFZimnjTyWfIvMdlwAoJTWO7JIqQDhl6FlSddLzn35l2Jl6lpnx3n8Uhh0NFZEpiexJTG5gUxLGv2ZVbbPmCMCamrFsRUaqzu5edNcQ2YjrfxSrFY2vVNCpirEYJA8PXhPF7LryNRGHitmNpHZLICQvbxw9K/04VOHyV+cZ5XaFbTdWuBi3Q2ecDH9Epl7OSqxJqWnWCV0zP1ErGacwi/Eck3Yjv6FsdroqA6NtX0aV9TfFGtKgsBY3Qc7lhCV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'
        doc.addImage(imgData, 'PNG', 40, 10, 50, 25)
        doc.addImage(imgData2, 'PNG', 120, 10, 35, 30)

        doc.text(`Pedido ${cod}`, 95, 60);

        doc.setFontSize(12);

        const encabezado = `
            Fecha de Pedido: ${fecha}
            Nombre PDV: ${selectedPdv}
            Cód. PDV: ${selectedIdPdv}
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

        const columns = ['Code', 'Nombre', 'Unidades', 'Stock Restante', 'Margen', 'Precio Unitario', 'SubTotal']

        let data = []

        dataInsercion.forEach((item) => {
            let insertData = [`${item.code}`, `${item.nombre}`, `${item.unidades}`, `${item.stock}`,
                `${item.margen}`, `${item.pvp}`, `${item.subtotal}`
            ]
            data.push(insertData)
        })

        doc.autoTable({
            startY: 150,
            head: [columns],
            body: data
        })

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

        const columns = ['Code', 'Nombre', 'Unidades', 'Margen', 'Precio Unitario', 'SubTotal']

        let data = []

        dataInsercion.forEach((item) => {
            let insertData = [`${item.code}`, `${item.nombre}`, `${item.unidades}`,
                `${item.margen}`, `${item.pvp}`, `${item.subtotal}`
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

        setSumaIva(0)
        setTotal(0)
    }

    const tableCustomStyles = {
        headCells: {
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            paddingLeft: '0 8px',
            justifyContent: 'center',
            backgroundColor: '#7E82D5'
          },
        },
      }

    const enviarCorreoOtro = (code) => {
        const asunto = `Estimado Vendedor ${vendedor}`
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
        Fecha de Pedido: ${fecha}
        <br>
        Nombre PDV: ${selectedPdv}
        <br>
        Cód. PDV: ${selectedIdPdv ? selectedIdPdv : "NO DISPONE"}
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
        Equipo de Automatización MarkUP / Gloria
        Para dudas respecto a la información del correo contactar a <PERSONA_ENCARGADA> <NUMERO_TELEFONICO> o responder al correo <CORREO> .
        `

        const pdf = generarPDFOtro(code)
        const pdfBase64 = pdf.output();

        const arrayMails = ['emilio.segovia@markup.ws','luis.andrade@markup.ec' , 'limberg.darocan@andina.com.ec', 'tania.buitron@andina.com.ec', 'william.hernandez@andina.com.ec']

        dispatch(enviarMailFormulario(asunto, arrayMails, [], cuerpo, pdfBase64, `Ventas.pdf`)).then((res) => {
            if (!!res.status) if(res.status === 200) {
                if(dataInsercion){
                    let arrayStock = []
                    dataInsercion.map((item) => {
                        const objStock = {
                            cod_producto: item.code,
                            stock: item.stock
                        }
                        arrayStock.push(objStock)
                    })
                    if(arrayStock !== 0){
                        actualizarStockGloriaFunc(arrayStock)
                    }
                }
            } else {mostrarAlerta(false, "Hubo un inconveniente al enviar al correo el pedido!!")}
            else mostrarAlerta(false, "Hubo un inconveniente al enviar al correo el pedido!!")
        })

        setDataInsercion([])
        setTotal(0);
        setSumaIva(0);
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
        Cód. Farmacia: ${selectedIdFarmacia ? selectedIdFarmacia : "NO DISPONE"}
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
        
        const cuerpoWhats = `
        Fwd: Pedido de transferencia ${vendedor} GenommaLab ${distribuidorSeleccionado}/ Registro ${cod}
        
        Estimado distribuidor.
        
        El siguiente correo es automatizado y corresponde a una solicitud de trasferencia con los datos indicados en el cuerpo del correo.
        
        
        Pedido de transferencia
        



        Distribuidor: ${distribuidorSeleccionado}
        
        Fecha de Pedido: ${fecha}
        
        Nombre Farmacia: ${selectedFarmacia}
        
        Cód. Farmacia: ${selectedIdFarmacia ? selectedIdFarmacia : "NO DISPONE"}
        
        RUC: ${ruc}
        
        Dirección Farmacia: ${direccion}
        
        Provincia: ${provincia}
        
        Vendedor: ${vendedor}
        
        


        ${observacion ? 
            `

                Observacion: ${observacion}
             
                ` : ''
        }




        Saludos.
        Equipo de Automatización MarkUP / Genomma
        Para dudas respecto a la información del correo contactar a Veronica Navarrete 098 0780 407 o responder al correo veronica.navarrete@markup.ws .
        `

        const pdf = distribuidorSeleccionado === "genomma" ? generarPDFPrimax(cod) : generarPDF(cod)
        const pdfBase64 = pdf.output();
        let arrayMails = []
        if(distribuidorSeleccionado === "leterago"){
            if(auth.datosUsuario.ID_USER === "USR-4"){
                arrayMails = ['emilio.segovia@markup.ws']
            }else{
                arrayMails = ['emilio.segovia@markup.ws', 'veronica.navarrete@markup.ws', 'leonardo@markup.ws',
                    'operaciones@innovaservgroup.com', 'krey@leterago.com.ec']
            }
            dispatch(enviarMailFormulario(asunto, arrayMails, [], cuerpo, pdfBase64, `Ventas_${cod}.pdf`)).then((res) => {
                if (!!res.status) if(res.status === 200) {mostrarAlerta(true, "xd", cod)} else {mostrarAlerta(false, "Hubo un inconveniente al enviar al correo el pedido!!")}
                else mostrarAlerta(false, "Hubo un inconveniente al enviar al correo el pedido!!")
            })
        }else if (distribuidorSeleccionado === "quifatex"){
            if(auth.datosUsuario.ID_USER === "USR-4"){
                arrayMails = ['emilio.segovia@markup.ws']
            }else{
                arrayMails = ['emilio.segovia@markup.ws', 'veronica.navarrete@markup.ws', 'leonardo@markup.ws',
                    'transferencias@quifatex.com', 'wrahian.marin@genommalab.com']
            }
            dispatch(enviarMailFormulario(asunto, arrayMails, [], cuerpo, pdfBase64, `Ventas_${cod}.pdf`)).then((res) => {
                if (!!res.status) if(res.status === 200) {mostrarAlerta(true, "xd", cod)} else {mostrarAlerta(false, "Hubo un inconveniente al enviar al correo el pedido!!")}
                else mostrarAlerta(false, "Hubo un inconveniente al enviar al correo el pedido!!")
            })
        }else if(distribuidorSeleccionado === "difare"){
            if(auth.datosUsuario.ID_USER === "USR-4"){
                arrayMails = ['emilio.segovia@markup.ws']
            }else{
                arrayMails = ['emilio.segovia@markup.ws', 'veronica.navarrete@markup.ws', 'leonardo@markup.ws',
                    (parseFloat(total)+parseFloat(sumaIva)).toFixed(2) >= 80 ? ('ccenter@grupodifare.com', 'andrea.jordan@genommalab.com') : 'andrea.jordan@genommalab.com', 'wrahian.marin@genommalab.com']
            }
            dispatch(enviarMailFormulario(asunto, arrayMails, [], cuerpo, pdfBase64, `Ventas_${cod}.pdf`)).then((res) => {
                if (!!res.status) if(res.status === 200) {mostrarAlerta(true, "xd", cod)} else {mostrarAlerta(false, "Hubo un inconveniente al enviar al correo el pedido!!")}
                else mostrarAlerta(false, "Hubo un inconveniente al enviar al correo el pedido!!")
            })
        }else if(distribuidorSeleccionado === "difare_franquicia"){
            arrayMails = ['emilio.segovia@markup.ws']
            dispatch(enviarMailFormulario(asunto, arrayMails, [], cuerpo, pdfBase64, `Ventas_${cod}.pdf`)).then((res) => {
                if (!!res.status) if(res.status === 200) {mostrarAlerta(true, "xd", cod)} else {mostrarAlerta(false, "Hubo un inconveniente al enviar al correo el pedido!!")}
                else mostrarAlerta(false, "Hubo un inconveniente al enviar al correo el pedido!!")
            })
        }else{
            const datosLocalProducto = {
                Distribuidor: 'ATIMASA S.A.',
                'RUC Distribuidor': '0991331859001',
                Proveedor: 'GENOMMALAB ECUADOR S.A.',
                'RUC Proveedor': '0992414499001',
                Direccion: 'AV. JOSÉ S CASTILLO Y JUSTINO CORNEJO',
                Local: selectedFarmacia,
                'Direccion Local': direccion,
                'Fecha Pedido': fecha
            };
            if(auth.datosUsuario.ID_USER === "USR-4"){
                arrayMails = ['emilio.segovia@markup.ws']
            }else{
                arrayMails = ['emilio.segovia@markup.ws', 'luis.andrade@markup.ws', 'stephanie.corral@genommalab.com', 'juanfrancisco@markup.ws']
            }
            dispatch(enviarMailFormularioMultiple(asunto, arrayMails, [], cuerpo, datosLocalProducto, pdfBase64, `Ventas_${cod}`)).then((res) => {
                if (!!res.status) if(res.status === 200) {mostrarAlerta(true, "xd", cod)} else {mostrarAlerta(false, "Hubo un inconveniente al enviar al correo el pedido!!")}
                else mostrarAlerta(false, "Hubo un inconveniente al enviar al correo el pedido!!")
            })
        }
        setDataInsercion([])
        setTotal(0);
        setSumaIva(0);
    }

    const mostrarAlerta = (bool, mensaje, cod) => {
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
                text: mensaje,
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
            <div className="p-6 bg-gray-100">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Levantamiento de pedidos</h1>
                {/* {auth.datosUsuario.RUC_CUENTA != '1790663973001' && (
                    <h2 className="text-xl font-semibold text-gray-600 mt-2">Proyecto GenExpertos 2024 - MarkUP</h2>
                )} */}
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {auth.datosUsuario.RUC_CUENTA !== '1790663973001' && (
                    <div className="flex-1 md:w-1/2">
                        <label htmlFor="distribuidor" className="block text-sm font-medium text-gray-700">Seleccionar distribuidor:</label>
                        <select className="form-select mt-1 block w-full p-2 border rounded" id="distribuidor" value={distribuidorSeleccionado} onChange={handleChange}>
                            <option value="">Seleccionar...</option>
                            {auth.datosUsuario.VALIDAR_DIST === "GENEXPERTOS" ? (
                                <>
                                    <option value="leterago">LETERAGO</option>
                                    <option value="quifatex">QUIFATEX</option>
                                    <option value="difare">DIFARE</option>
                                </>
                            ) : auth.datosUsuario.VALIDAR_DIST === "PRIMAX" ? (
                                <option value="genomma">PRIMAX</option>
                            ) : auth.datosUsuario.VALIDAR_DIST === "DIFARE_FRANQUICIA" ? (
                                <>
                                    <option value="difare_franquicia">DIFARE FRANQUICIA</option>
                                </>
                            ) : (
                                <>
                                    <option value="leterago">LETERAGO</option>
                                    <option value="quifatex">QUIFATEX</option>
                                    <option value="difare">DIFARE</option>
                                    <option value="difare_franquicia">DIFARE FRANQUICIA</option>
                                    <option value="genomma">PRIMAX</option>
                                </>
                            )}
                            {/* <option value="farmaenlace">FARMAENLACE</option> */}
                        </select>
                    </div>
                )}

                <div className="flex-1 flex justify-center md:justify-start">
                    <img src={logoGen} alt="Logo" className="w-50 h-auto"/>
                </div>

                {auth.datosUsuario.RUC_CUENTA === '1790663973001' ? (
                    <div className="flex-1 flex justify-center md:justify-start">
                        <img src={logo3} alt="Logo 3" className="w-24 h-auto"/>
                    </div>
                ) : (
                    <div className="flex-1 flex justify-center md:justify-start">
                        <img src={logo} alt="Logo 2" className="w-50 h-auto"/>
                    </div>
                )}
                
                <div className="flex-1 flex justify-center md:justify-end gap-4">
                    <button type="button" className="btn btn-danger px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded" onClick={() => logout()}>Logout</button>
                    
                    {auth.datosUsuario.RUC_CUENTA !== '1790663973001' && (
                        <button type="button" className="btn btn-success px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded" onClick={() => setOpenAgregarCliente(true)}>Nuevo Cliente</button>
                    )}
                </div>
            </div>

            {auth.datosUsuario.RUC_CUENTA !== '1790663973001' && (
                <div className="mt-6 text-center">
                    <p className="text-lg font-medium text-gray-700">Distribuidor seleccionado: <span className="font-bold">{distribuidorSeleccionado==="genomma" ? 'PRIMAX' : distribuidorSeleccionado.toLocaleUpperCase()}</span></p>
                </div>
            )}
        </div>
            <div className='p-6 bg-gray-100'>
                <div className='bg-white p-6 rounded-lg shadow-lg flex flex-col gap-6 mx-auto'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-group">
                            <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Fecha:</label>
                            <input type="date" className="form-control mt-1 block w-full p-2 border rounded" id="fecha" value={fecha} disabled={true} />
                        </div>
                        
                        {auth.datosUsuario.RUC_CUENTA !== '1790663973001' ? (
                            <div className="relative form-group">
                                <label htmlFor="farmacia" className="block text-sm font-medium text-gray-700">Nombre Local:</label>
                                <input type='text' className='form-control mt-1 block w-full p-2 border rounded' 
                                    disabled={!distribuidorSeleccionado} 
                                    onChange={e => onChangeHandlerFarmacia(e.target.value)}
                                    value={selectedFarmacia} />
                                {suggestionsFarmacias && suggestionsFarmacias.length > 0 && (
                                    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto">
                                        {suggestionsFarmacias.map((suggestion) => (
                                            <div key={suggestion.idCliente}
                                                className='suggestion p-2 hover:bg-gray-200 cursor-pointer'
                                                onClick={() => onSuggestHandlerFarmacia(suggestion.razon_social, suggestion.idCliente)}
                                            >
                                                {suggestion.razon_social}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="relative form-group">
                                <label htmlFor="pdv" className="block text-sm font-medium text-gray-700">PDV:</label>
                                <input type='text' className='form-control mt-1 block w-full p-2 border rounded'
                                    onChange={e => onChangeHandlerPDV(e.target.value)}
                                    value={selectedPdv} />
                                {suggestionsPdv && suggestionsPdv.length > 0 && (
                                    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto">
                                        {suggestionsPdv.map((suggestion) => (
                                            <div key={suggestion.idCliente}
                                                className='suggestion p-2 hover:bg-gray-200 cursor-pointer'
                                                onClick={() => onSuggestHandlerPdv(suggestion.razon_social, suggestion.idCliente)}
                                            >
                                                {suggestion.razon_social}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {auth.datosUsuario.RUC_CUENTA !== '1790663973001' ? (
                            <div className="form-group">
                                <label htmlFor="codFarmacia" className="block text-sm font-medium text-gray-700">Cod. Local:</label>
                                <input type="text" className="form-control mt-1 block w-full text-center p-2 border rounded" id="codFarmacia" name="codFarmacia"
                                    value={selectedIdFarmacia === -1 ? "" : selectedIdFarmacia} disabled={true} />
                            </div>
                        ) : (
                            <div className="form-group">
                                <label htmlFor="codPdv" className="block text-sm font-medium text-gray-700">Cod. PDV:</label>
                                <input type="text" className="form-control mt-1 block w-full text-center p-2 border rounded" id="codPdv" name="codPdv"
                                    value={selectedIdPdv === -1 ? "" : selectedIdPdv} disabled={true} />
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="ruc" className="block text-sm font-medium text-gray-700">RUC:</label>
                            <input type="text" className="form-control mt-1 block w-full text-center p-2 border rounded" id="ruc" name="ruc" value={ruc} disabled={true} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">Direccion:</label>
                            <input type="text" className="form-control mt-1 block w-full text-center p-2 border rounded" id="direccion" name="direccion" value={direccion ? direccion : ""} disabled={true} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="provincia" className="block text-sm font-medium text-gray-700">Provincia:</label>
                            <input type="text" className="form-control mt-1 block w-full text-center p-2 border rounded" id="provincia" name="provincia" value={provincia} disabled={true} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="vendedor" className="block text-sm font-medium text-gray-700">Vendedor:</label>
                            <input type="text" className="form-control mt-1 block w-full text-center p-2 border rounded" id="vendedor" name="vendedor" value={vendedor} disabled={true} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="fecha">Observacion:</label>
                    <textarea className="form-control" rows="4" cols="50" id="observacion" name="observacion"
                        onChange={(e) => setObservacion(e.target.value)} disabled={selectedIdFarmacia === -1 && selectedIdPdv === -1}
                        value={observacion}
                    />
                </div>
            </div>
            <div className='buttons-div'>
                <div className="form-group">
                    <button type='button' className='btn btn-success' disabled={selectedIdFarmacia === -1 && selectedIdPdv === -1}
                        onClick={() => setOpenModal(true)}>Agregar Producto</button>
                </div>
                {/* <div className="form-group">
                    <button type='button' className='btn btn-dark' disabled={dataInsercion.length === 0} onClick={() => insertarRegistroFunc()}>Enviar</button>
                </div> */}
                <div className="form-group">
                    <button type='button' className='btn btn-primary' disabled={false} onClick={() => reset()}>Reset</button>
                </div>
                {/* <div className="form-group">
                    <button type='button' className='btn btn-danger' disabled={dataInsercion.length === 0} onClick={() => generarPDFPrimax("666").save("testpdf.pdf")}>Verificar</button>
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
                    <span class="label">IVA:</span>
                    <span class="amount">${sumaIva.toFixed(2)}</span>
                </div>
            </div>
            <div class="container1">
                <div class="subtotal-container">
                    <span class="label">SubTotal Descuento:</span>
                    <span class="amount">${parseFloat(total).toFixed(2)}</span>
                </div>
            </div>
            <div class="container1">
                <div class="subtotal-container">
                    <span class="label">Total:</span>
                    <span class="amount">${(parseFloat(total)+parseFloat(sumaIva)).toFixed(2)}</span>
                </div>
            </div>
            <button type='button' className='btn btn-dark' disabled={dataInsercion.length === 0} onClick={() => {
                if(auth.datosUsuario.RUC_CUENTA == '1790663973001') insertarRegistroFunc()
                else insertarRegistroFunc()
            }}>Enviar</button>
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
            dataInsercion={dataInsercion}
            setDataInsercion={setDataInsercion}
            agregarProductoCola={agregarProductoCola}
            sumaSuerox={sumaSuerox}
            dataProductos={dataInsercion}/>}

        {openAgregarCliente && <AgregarCliente
            closeModal={setOpenAgregarCliente}
            isOpen={openAgregarCliente}
            validarDist={VALIDAR_DIST}/>}
        </>
    )
}
export default LlenarDatos;