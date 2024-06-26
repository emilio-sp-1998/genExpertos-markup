import React, {useState, useEffect} from 'react';
import './ModalProductos.css'
import { obtenerProducto } from '../../../../../redux/actions/pedidosActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ModalProductos(
  {
    closeModal, 
    productosLista, 
    distribuidorSeleccionado, 
    productos, 
    setProductos, 
    porcentaje, 
    setPorcentaje,
    subtotal,
    setSubtotal,
    cantidad,
    setCantidad,
    agregarProductoCola,
    sumaSuerox,
    dataProductos
  }
  ) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState(1);
  const [alertMessage, setAlertMessage] = useState("");

  const [selectedProducto, setSelectedProducto] = useState('');
  const [selectedIdProducto, setSelectedIdProducto] = useState(-1);
  const [suggestionsProducto, setSuggestionsProducto] = useState([]);

  const [bloquear, setBloquear] = useState(false);

  const onChangeHandlerProducto = (producto) => {
    let matches = []
    if(producto.length>0){
      matches = productosLista.filter((prod) => {
        const regex = new RegExp(`${producto}`, "gi")
        return prod.nombre_producto.match(regex)
      })
    }
    matches = matches.slice(0, 10)
    console.log('matches', matches)
    setSuggestionsProducto(matches)
    setSelectedProducto(producto)
  }

  const onSuggestHandlerProducto = (producto, id) => {
    setSelectedProducto(producto)
    setSelectedIdProducto(id)
    setSuggestionsProducto([])
    setCantidad(0)
  }

  useEffect(() => {
    if(selectedIdProducto !== -1){
        obtenerProductoFunc();
    }
  }, [selectedIdProducto])

  useEffect(() => {
    if(productos){
      if(productos.MARCA === "SUEROX"){
        const cantidadTotal = parseInt(sumaSuerox) + parseInt(cantidad)
        if(sumaSuerox < 13){
          console.log("CANT: "+ cantidadTotal)
          setPorcentaje(cantidadTotal == 1 ? productos.ESCALA_1_UNIDAD: 
            cantidadTotal == 2 ? productos.ESCALA_2_UNIDAD:
            parseInt(cantidadTotal) >= 3 && parseInt(cantidadTotal) < 6 ? productos.ESCALA_3_UNIDAD:
            parseInt(cantidadTotal) >= 6 && parseInt(cantidadTotal) < 12 ? productos.ESCALA_6_UNIDAD:
            cantidadTotal == 12 ? productos.ESCALA_12_UNIDAD:
            parseInt(cantidadTotal) >= 13 && parseInt(cantidadTotal) < 36 ? productos.ESCALA_26_UNIDAD:
            parseInt(cantidadTotal) >= 36 ? productos.ESCALA_36_UNIDAD : 0)
        }else if(sumaSuerox >= 13 && sumaSuerox < 36){
          setPorcentaje(cantidadTotal == 13 ? productos.ESCALA_11_UNIDAD:
            parseInt(cantidadTotal) >= 13 && parseInt(cantidadTotal) < 36 ? productos.ESCALA_26_UNIDAD:
            parseInt(cantidadTotal) >= 36 ? productos.ESCALA_36_UNIDAD : 0)
        }/* else if(sumaSuerox >= 35 && sumaSuerox < 36){
          setPorcentaje(cantidadTotal == 26 ? productos.ESCALA_11_UNIDAD:
            parseInt(cantidadTotal) >= 26 && parseInt(cantidadTotal) < 36 ? productos.ESCALA_26_UNIDAD:
            parseInt(cantidadTotal) >= 36 ? productos.ESCALA_36_UNIDAD: 0)
        } */ else{
          setPorcentaje(cantidadTotal ? productos.ESCALA_36_UNIDAD : 0)
        }
      }else{
        setPorcentaje(cantidad == 1 ? productos.ESCALA_1_UNIDAD: 
        cantidad == 2 ? productos.ESCALA_2_UNIDAD:
        parseInt(cantidad) >= 3 && parseInt(cantidad) < 6 ? productos.ESCALA_3_UNIDAD:
        parseInt(cantidad) >= 6 && parseInt(cantidad) < 11 ? productos.ESCALA_6_UNIDAD:
        cantidad == 11 ? productos.ESCALA_11_UNIDAD:
        parseInt(cantidad) >= 12 ? productos.ESCALA_12_UNIDAD:0)
      }
    }
    if(porcentaje || porcentaje == 0){
      setSubtotal(parseFloat((productos.PVP_SIN_IVA*cantidad)-((productos.PVP_SIN_IVA*cantidad)*porcentaje)).toFixed(2))
    }
  }, [cantidad, porcentaje, subtotal])

  const obtenerProductoFunc = () => {
    dispatch(obtenerProducto(distribuidorSeleccionado, selectedIdProducto)).then((res) => {
        if (res.status) {
            if(res.status === 200){
                const data = res.data
                console.log(distribuidorSeleccionado)
                if (distribuidorSeleccionado === 'leterago') setBloquear(dataProductos.find(p => p.idCode === data.IDPROD_LETERAGO))
                else if (distribuidorSeleccionado === 'quifatex') setBloquear(dataProductos.find(p => p.idCode === data.IDPROD_QUIFATEX))
                else setBloquear(dataProductos.find(p => p.idCode === data.IDPROD_DIFARE))
                setProductos(data)
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

  return (
    <div className='fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
      <div className='bg-white p-5 rounded flex flex-col gap-5 justify-center' style={{
          width: 600,
          height: 600,
          backgroundColor: 'steelblue',
          style: "border: 5px outset red;"
        }}>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="fecha">Nombre Producto:</label>
            <input type='text' className='form-control' 
              onChange={e => onChangeHandlerProducto(e.target.value)}
              value={selectedProducto}></input>
              {suggestionsProducto && suggestionsProducto.map((suggestion) => {
                return(
                  <div key={suggestion.id}
                      className='suggestion col-md-12 justify-content-md-center'
                      onClick={() => onSuggestHandlerProducto(suggestion.nombre_producto, suggestion.id)}
                  >
                      {suggestion.nombre_producto}</div>
                )
              })}
          </div>
        </div>
        <div className="col-md-6 flex">
          <div className="form-group">
              <label htmlFor="fecha">CANTIDAD:</label>
              <input type="text" className="form-control text-center" id="cantidad" name="cantidad" value={cantidad} 
              onChange={(e) => setCantidad(e.target.value)}
              disabled={selectedIdProducto === -1}/>
          </div>
          <div className="form-group">
              <label htmlFor="fecha">DESCUENTO:</label>
              <input type="text" className="form-control text-center" id="descuento" name="descuento" 
              value={productos ? parseInt(porcentaje*100) + "%" : ""} disabled={true}/>
          </div>
        </div>
        <div className="col-md-6 flex">
          <div className="form-group">
                <label htmlFor="fecha">PVP (SIN IVA):</label>
                <input type="text" className="form-control text-center" id="pvp" name="pvp" 
                value={Object.keys(productos).length !== 0 ? "$"+productos.PVP_SIN_IVA : ""} disabled={true}/>
          </div>
          <div className="form-group">
                <label htmlFor="fecha">Subtotal:</label>
                <input type="text" className="form-control text-center" id="subtotal" name="subtotal" 
                value={cantidad ? "$"+parseFloat((productos.PVP_SIN_IVA*cantidad)-((productos.PVP_SIN_IVA*cantidad)*porcentaje)).toFixed(2):""} disabled={true}/>
          </div>
        </div>
        <button className="btn1 btn btn-danger" onClick={() => closeModal(false)}>CERRAR</button>
        <button className='btn btn-success' disabled={subtotal == 0 || bloquear || Object.keys(productos).length === 0 ? true : false} onClick={() => agregarProductoCola()}>AGREGAR</button>
        {bloquear ? (
          <div>
            <p className="text-sm font-normal text-red-700 mt-1">
                Este Producto ya está insertado
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}