import React, {useState, useEffect} from 'react';
import './ModalProductos.css'
import { obtenerProducto, obtenerProductoPdv } from '../../../../../redux/actions/pedidosActions';
import { useDispatch, useSelector } from 'react-redux';
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
    dataInsercion,
    setDataInsercion,
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
  const [textoBloquear, setTextoBloquear] = useState("");

  const auth = useSelector((state) => state.auth);

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
        console.log(dataInsercion)
        obtenerProductoFunc();
    }
  }, [selectedIdProducto])

  useEffect(() => {
    if(productos){
      if(auth.datosUsuario.RUC_CUENTA != "1790663973001"){
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
          }else /* if(sumaSuerox >= 13 && sumaSuerox < 36) */{
            setPorcentaje(cantidadTotal == 13 ? productos.ESCALA_11_UNIDAD:
              parseInt(cantidadTotal) >= 13 && parseInt(cantidadTotal) < 36 ? productos.ESCALA_26_UNIDAD:
              parseInt(cantidadTotal) >= 36 ? productos.ESCALA_36_UNIDAD : 0)
          }/* else if(sumaSuerox >= 35 && sumaSuerox < 36){
            setPorcentaje(cantidadTotal == 26 ? productos.ESCALA_11_UNIDAD:
              parseInt(cantidadTotal) >= 26 && parseInt(cantidadTotal) < 36 ? productos.ESCALA_26_UNIDAD:
              parseInt(cantidadTotal) >= 36 ? productos.ESCALA_36_UNIDAD: 0)
          } */ /* else{
            setPorcentaje(cantidadTotal ? productos.ESCALA_36_UNIDAD : 0)
          } */
        }else{
          setPorcentaje(cantidad == 1 ? productos.ESCALA_1_UNIDAD: 
          cantidad == 2 ? productos.ESCALA_2_UNIDAD:
          parseInt(cantidad) >= 3 && parseInt(cantidad) < 6 ? productos.ESCALA_3_UNIDAD:
          parseInt(cantidad) >= 6 && parseInt(cantidad) < 11 ? productos.ESCALA_6_UNIDAD:
          cantidad == 11 ? productos.ESCALA_11_UNIDAD:
          parseInt(cantidad) >= 12 ? productos.ESCALA_12_UNIDAD:0)
        }
      }else{
        if(productos.PORCENTAJES) {
          const porc = Object.entries(JSON.parse(productos.PORCENTAJES)).map(([ne, porcentaje]) => ({
            nombreEscala: ne,
            escala: parseInt(ne.match(/\d+/)[0]),
            porcentaje: parseFloat(porcentaje)
          }));
          porc.some((item) => {
            if (cantidad >= item.escala) {
              setPorcentaje(item.porcentaje)
            } else if (cantidad < porc[0].escala){
              setPorcentaje(0)
            }
          })
        }
        setBloquear(parseInt(productos.STOCK) < 0)
        setTextoBloquear(parseInt(productos.STOCK) < 0 ? "La cantidad sobrepasa el Stock" : "")
      }
    }
    if(porcentaje || porcentaje == 0){
      setSubtotal(parseFloat((productos.PVP_SIN_IVA*cantidad)-((productos.PVP_SIN_IVA*cantidad)*porcentaje)).toFixed(2))
    }
  }, [cantidad, porcentaje, subtotal])

  useEffect(() => {
    if(auth.datosUsuario.RUC_CUENTA == "1790663973001"){
      if(Object.keys(productos).length !== 0){
        productos.STOCK = productosLista.find(pl => pl.id === productos.COD_PRODUCTO).stock
      }
      if(cantidad != 0){
        productos.STOCK = productos.STOCK - cantidad;
      }
    }
  }, [cantidad])

  const obtenerProductoFunc = () => {
    if(auth.datosUsuario.RUC_CUENTA != "1790663973001"){
      dispatch(obtenerProducto(distribuidorSeleccionado, selectedIdProducto)).then((res) => {
        if (res.status) {
            if(res.status === 200){
                const data = res.data
                console.log(distribuidorSeleccionado)
                if (distribuidorSeleccionado === 'leterago' || distribuidorSeleccionado === 'leterago_franquicia') {
                  setBloquear(dataProductos.find(p => p.idCode === data.IDPROD_LETERAGO))
                  setTextoBloquear(dataProductos.find(p => p.idCode === data.IDPROD_LETERAGO) ? "Este Producto ya está insertado" : "")
                }
                else if (distribuidorSeleccionado === 'quifatex') {
                  setBloquear(dataProductos.find(p => p.idCode === data.IDPROD_QUIFATEX))
                  setTextoBloquear(dataProductos.find(p => p.idCode === data.IDPROD_QUIFATEX) ? "Este Producto ya está insertado" : "")
                }
                else {
                  setBloquear(dataProductos.find(p => p.idCode === data.IDPROD_DIFARE))
                  setTextoBloquear(dataProductos.find(p => p.idCode === data.IDPROD_DIFARE) ? "Este Producto ya está insertado" : "")
                }
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
    }else{
      dispatch(obtenerProductoPdv(selectedIdProducto)).then((res) => {
        if (res.status){
          if (res.status === 200){
            const data = res.data
            let productoEncontrado = dataInsercion.find(p => p.code === data.COD_PRODUCTO)
            if(productoEncontrado) {
              data.STOCK = productoEncontrado.stock
              setBloquear(productoEncontrado)
              setTextoBloquear(productoEncontrado ? "Este Producto ya está insertado" : "")
            }
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
    
  }

  return (
    <div className='fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg flex flex-col gap-6' style={{ width: '80%', maxWidth: '600px', height: 'auto', backgroundColor: 'steelblue', border: '5px outset red' }}>
          <div className="form-group">
              <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Nombre Producto:</label>
              <input type='text' className='form-control mt-1 block w-full p-2 border rounded'
                  onChange={e => onChangeHandlerProducto(e.target.value)}
                  value={selectedProducto} />
              <div className="relative">
                  {suggestionsProducto && suggestionsProducto.length > 0 && (
                      <div className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto">
                          {suggestionsProducto.map((suggestion) => (
                              <div key={suggestion.id}
                                  className='suggestion p-2 hover:bg-gray-200 cursor-pointer'
                                  onClick={() => onSuggestHandlerProducto(suggestion.nombre_producto, suggestion.id)}
                              >
                                  {suggestion.nombre_producto}
                              </div>
                          ))}
                      </div>
                  )}
              </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                  <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">CANTIDAD:</label>
                  <input type="text" className="form-control mt-1 block w-full text-center p-2 border rounded" id="cantidad" name="cantidad" value={cantidad}
                      onChange={(e) => setCantidad(e.target.value)}
                      disabled={selectedIdProducto === -1} />
              </div>
              <div className="form-group">
                  <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">DESCUENTO:</label>
                  <input type="text" className="form-control mt-1 block w-full text-center p-2 border rounded" id="descuento" name="descuento"
                      value={productos ? parseInt(porcentaje * 100) + "%" : ""} disabled={true} />
              </div>
              {auth.datosUsuario.RUC_CUENTA == '1790663973001' && (
                  <div className="form-group">
                      <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">STOCK:</label>
                      <input type="text" className="form-control mt-1 block w-full text-center p-2 border rounded" id="stock" name="stock"
                          value={productos ? (productos.STOCK < 0 ? 0 : productos.STOCK) : ""} disabled={true} />
                  </div>
              )}
              <div className="form-group">
                  <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">PVP (SIN IVA):</label>
                  <input type="text" className="form-control mt-1 block w-full text-center p-2 border rounded" id="pvp" name="pvp"
                      value={Object.keys(productos).length !== 0 ? "$" + productos.PVP_SIN_IVA : ""} disabled={true} />
              </div>
              <div className="form-group">
                  <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Subtotal:</label>
                  <input type="text" className="form-control mt-1 block w-full text-center p-2 border rounded" id="subtotal" name="subtotal"
                      value={cantidad ? "$" + parseFloat((productos.PVP_SIN_IVA * cantidad) - ((productos.PVP_SIN_IVA * cantidad) * porcentaje)).toFixed(2) : ""} disabled={true} />
              </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
              <button className="btn1 btn btn-danger p-2 bg-red-500 text-white rounded" onClick={() => { closeModal(false); setProductos({}); setCantidad(0); setPorcentaje(0) }}>CERRAR</button>
              <button className='btn btn-success p-2 bg-green-500 text-white rounded' disabled={((subtotal == 0 || !subtotal) || cantidad == 0) || bloquear || Object.keys(productos).length === 0} onClick={() => agregarProductoCola()}>AGREGAR</button>
          </div>
          {bloquear && (
              <div>
                  <p className="text-sm font-normal text-red-700 mt-1">
                      {textoBloquear}
                  </p>
              </div>
          )}
      </div>
  </div>

  )
}