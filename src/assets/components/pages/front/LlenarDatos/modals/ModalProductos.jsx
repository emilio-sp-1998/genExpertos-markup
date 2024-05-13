import React, {useState, useEffect} from 'react';
import './ModalProductos.css'
import { obtenerProducto } from '../../../../../redux/actions/pedidosActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ModalProductos({closeModal, productosLista, distribuidorSeleccionado}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState(1);
  const [alertMessage, setAlertMessage] = useState("");

  const [selectedProducto, setSelectedProducto] = useState('');
  const [selectedIdProducto, setSelectedIdProducto] = useState(-1);
  const [suggestionsProducto, setSuggestionsProducto] = useState([]);

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
  }

  useEffect(() => {
    if(selectedIdProducto !== -1){
        obtenerProductoFunc();
    }
  }, [selectedIdProducto])

  const obtenerProductoFunc = () => {
    dispatch(obtenerProducto(distribuidorSeleccionado, selectedIdProducto)).then((res) => {
        if (res.status) {
            if(res.status === 200){
                const data = res.data
                console.log(data)
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
      <div className='bg-white p-5 rounded flex flex-col gap-5' style={{
          width: 800,
          height: 800,
          backgroundColor: 'steelblue',
        }}>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="fecha">Nombre Farmacia:</label>
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
        <button onClick={() => closeModal(false)}>CERRAR</button>
      </div>
    </div>
  )
}