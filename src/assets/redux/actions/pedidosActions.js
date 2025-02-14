import axios from "axios";
import GLOBAL from "../../../helpers/globals";

const server = GLOBAL.server;

export function nombreFarmacia(local) {
    try{
      return async function (dispatch) {
        let token = localStorage.getItem("token");
        dispatch({ type: "NOMBRE_FARMACIA" });
        try{
          const res = await axios.post(
            server + "/pedidos/nombreFarmacia",
            {local},
            {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
            }
          )
          dispatch({ type: "NOMBRE_FARMACIA_SUCCESS", payload: res.data });
          return res;
        }catch(e){
          dispatch({ type: "NOMBRE_FARMACIA_FAIL", payload: {} });
          let res = {};
          if (!!e.response) {
            res = e.response;
          }
          return res;
        }
      }
    } catch (e) {
      console.log(e);
    }
}

export function listarProductos(local) {
    try{
      return async function (dispatch) {
        let token = localStorage.getItem("token");
        dispatch({ type: "LISTAR_PRODUCTOS" });
        try{
          const res = await axios.post(
            server + "/pedidos/listarProductos",
            {local},
            {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
            }
          )
          dispatch({ type: "LISTAR_PRODUCTOS_SUCCESS", payload: res.data });
          return res;
        }catch(e){
          dispatch({ type: "LISTAR_PRODUCTOS_FAIL", payload: {} });
          let res = {};
          if (!!e.response) {
            res = e.response;
          }
          return res;
        }
      }
    } catch (e) {
      console.log(e);
    }
}

export function listarProductosPdv(cuenta_comercial) {
  try{
    return async function (dispatch) {
      let token = localStorage.getItem("token");
      dispatch({ type: "LISTAR_PRODUCTOS_PDV" });
      try{
        const res = await axios.post(
          server + "/pedidos/listarProductosPdv",
          {cuenta_comercial},
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        dispatch({ type: "LISTAR_PRODUCTOS_PDV_SUCCESS", payload: res.data });
        return res;
      }catch(e){
        dispatch({ type: "LISTAR_PRODUCTOS_PDV_FAIL", payload: {} });
        let res = {};
        if (!!e.response) {
          res = e.response;
        }
        return res;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export function obtenerFarmacia(local, idCliente, idMkTrade) {
    try{
      return async function (dispatch) {
        let token = localStorage.getItem("token");
        dispatch({ type: "OBTENER_FARMACIA" });
        console.log(idCliente)
        try{
          const res = await axios.post(
            server + "/pedidos/obtenerFarmacia",
            {local, idCliente, idMkTrade},
            {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
            }
          )
          dispatch({ type: "OBTENER_FARMACIA_SUCCESS", payload: res.data });
          return res;
        }catch(e){
          dispatch({ type: "OBTENER_FARMACIA_FAIL", payload: {} });
          let res = {};
          if (!!e.response) {
            res = e.response;
          }
          return res;
        }
      }
    } catch (e) {
      console.log(e);
    }
}

export function obtenerPdv(id_involves) {
  try{
    return async function (dispatch) {
      let token = localStorage.getItem("token");
      dispatch({ type: "OBTENER_PDV" });
      try{
        const res = await axios.post(
          server + "/pedidos/obtenerPdv",
          {id_involves},
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        dispatch({ type: "OBTENER_PDV_SUCCESS", payload: res.data });
        return res;
      }catch(e){
        dispatch({ type: "OBTENER_PDV_FAIL", payload: {} });
        let res = {};
        if (!!e.response) {
          res = e.response;
        }
        return res;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export function obtenerProducto(local, id) {
    try{
      return async function (dispatch) {
        let token = localStorage.getItem("token");
        dispatch({ type: "OBTENER_PRODUCTO" });
        try{
          const res = await axios.post(
            server + "/pedidos/obtenerProducto",
            {local, id},
            {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
            }
          )
          dispatch({ type: "OBTENER_PRODUCTO_SUCCESS", payload: res.data });
          return res;
        }catch(e){
          dispatch({ type: "OBTENER_PRODUCTO_FAIL", payload: {} });
          let res = {};
          if (!!e.response) {
            res = e.response;
          }
          return res;
        }
      }
    } catch (e) {
      console.log(e);
    }
}

export function obtenerProductoPdv(cod_producto) {
  try{
    return async function (dispatch) {
      let token = localStorage.getItem("token");
      dispatch({ type: "OBTENER_PRODUCTO_PDV" });
      try{
        const res = await axios.post(
          server + "/pedidos/obtenerProductoPdv",
          {cod_producto},
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        dispatch({ type: "OBTENER_PRODUCTO_PDV_SUCCESS", payload: res.data });
        return res;
      }catch(e){
        dispatch({ type: "OBTENER_PRODUCTO_PDV_FAIL", payload: {} });
        let res = {};
        if (!!e.response) {
          res = e.response;
        }
        return res;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export function obtenerVendedor(local) {
    try{
      return async function (dispatch) {
        let token = localStorage.getItem("token");
        dispatch({ type: "OBTENER_VENDEDOR" });
        try{
          const res = await axios.post(
            server + "/pedidos/obtenerVendedor",
            {local},
            {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
            }
          )
          dispatch({ type: "OBTENER_VENDEDOR_SUCCESS", payload: res.data });
          return res;
        }catch(e){
          dispatch({ type: "OBTENER_VENDEDOR_FAIL", payload: {} });
          let res = {};
          if (!!e.response) {
            res = e.response;
          }
          return res;
        }
      }
    } catch (e) {
      console.log(e);
    }
}

export function enviarMailFormulario(asunto, correodest, correocc, cuerpo, adjunto, filename) {
  try{
    return async function (dispatch) {
      let token = localStorage.getItem("token");
      dispatch({ type: "ENVIAR_MAIL" });
      try{
        const res = await axios.post(
          server + "/pedidos/enviarMailFormulario",
          {asunto, correodest, correocc, cuerpo, adjunto, filename},
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        dispatch({ type: "ENVIAR_MAIL_SUCCESS", payload: res.data });
        return res;
      }catch(e){
        dispatch({ type: "ENVIAR_MAIL_FAIL", payload: {} });
        let res = {};
        if (!!e.response) {
          res = e.response;
        }
        return res;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export function enviarMailFormularioMultiple(asunto, correodest, correocc, cuerpo, datosExcel, pdfBase64, nombreArchivo) {
  try{
    return async function (dispatch) {
      let token = localStorage.getItem("token");
      dispatch({ type: "ENVIAR_MAIL_MULTIPLE" });
      try{
        const res = await axios.post(
          server + "/pedidos/enviarMailFormularioMultiple",
          {asunto, correodest, correocc, cuerpo, datosExcel, pdfBase64, nombreArchivo},
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        dispatch({ type: "ENVIAR_MAIL_MULTIPLE_SUCCESS", payload: res.data });
        return res;
      }catch(e){
        dispatch({ type: "ENVIAR_MAIL_MULTIPLE_FAIL", payload: {} });
        let res = {};
        if (!!e.response) {
          res = e.response;
        }
        return res;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export function enviarMailFormulario2(asunto, correodest, cuerpo, adjunto, filename) {
  try{
    return async function (dispatch) {
      let token = localStorage.getItem("token");
      dispatch({ type: "ENVIAR_MAIL_2" });
      try{
        const res = await axios.post(
          server + "/pedidos/enviarMailFormulario2",
          {asunto, correodest, cuerpo, adjunto, filename},
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        dispatch({ type: "ENVIAR_MAIL_2_SUCCESS", payload: res.data });
        return res;
      }catch(e){
        dispatch({ type: "ENVIAR_MAIL_2_FAIL", payload: {} });
        let res = {};
        if (!!e.response) {
          res = e.response;
        }
        return res;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export function insertarRegistro(local_farmacia, cod_local, vendedor, productos, iva, subtotal_reg, total_reg, observacion, ruc_cuenta, idMktrade) {
  try{
    return async function (dispatch) {
      let token = localStorage.getItem("token");
      dispatch({ type: "INSERTAR_REGISTRO" });
      try{
        const res = await axios.post(
          server + "/pedidos/insertarRegistro",
          {local_farmacia, cod_local, vendedor, productos, iva, subtotal_reg, total_reg, observacion, ruc_cuenta, idMktrade},
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        dispatch({ type: "INSERTAR_REGISTRO_SUCCESS", payload: res.data });
        return res;
      }catch(e){
        dispatch({ type: "INSERTAR_REGISTRO_FAIL", payload: {} });
        let res = {};
        if (!!e.response) {
          res = e.response;
        }
        return res;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export function obtenerUltimoRegistro() {
  try{
    return async function (dispatch) {
      let token = localStorage.getItem("token");
      dispatch({ type: "OBTENER_ULTIMO_REGISTRO" });
      try{
        const res = await axios.post(
          server + "/pedidos/obtenerUltimoRegistro",
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        dispatch({ type: "OBTENER_ULTIMO_REGISTRO_SUCCESS", payload: res.data });
        return res;
      }catch(e){
        dispatch({ type: "OBTENER_ULTIMO_REGISTRO_FAIL", payload: {} });
        let res = {};
        if (!!e.response) {
          res = e.response;
        }
        return res;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export function actualizarStockGloria(arrayProducto) {
  try{
    return async function (dispatch) {
      let token = localStorage.getItem("token");
      dispatch({ type: "ACTUALIZAR_STOCK_GLORIA_REGISTRO" });
      try{
        const res = await axios.post(
          server + "/pedidos/actualizarStockGloria",
          {arrayProducto},
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        dispatch({ type: "ACTUALIZAR_STOCK_GLORIA_REGISTRO_SUCCESS", payload: res.data });
        return res;
      }catch(e){
        dispatch({ type: "ACTUALIZAR_STOCK_GLORIA_REGISTRO_FAIL", payload: {} });
        let res = {};
        if (!!e.response) {
          res = e.response;
        }
        return res;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export function agregarCliente(values, distribuidor) {
  try{
    return async function (dispatch) {
      let token = localStorage.getItem("token");
      dispatch({ type: "AGREGAR_CLIENTE" });
      try{
        const res = await axios.post(
          server + "/pedidos/agregarCliente",
          {values, distribuidor},
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        dispatch({ type: "AGREGAR_CLIENTE_SUCCESS", payload: res.data });
        return res;
      }catch(e){
        dispatch({ type: "AGREGAR_CLIENTE_FAIL", payload: {} });
        let res = {};
        if (!!e.response) {
          res = e.response;
        }
        return res;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export function verificarClienteExistente(codFarmacia, distribuidor) {
  try{
    return async function (dispatch) {
      let token = localStorage.getItem("token");
      dispatch({ type: "VERIFICAR_CLIENTE_EXISTENTE" });
      try{
        const res = await axios.post(
          server + "/pedidos/verificarClienteExistente",
          {codFarmacia, distribuidor},
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        dispatch({ type: "VERIFICAR_CLIENTE_EXISTENTE_SUCCESS", payload: res.data });
        return res;
      }catch(e){
        dispatch({ type: "VERIFICAR_CLIENTE_EXISTENTE_FAIL", payload: {} });
        let res = {};
        if (!!e.response) {
          res = e.response;
        }
        return res;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export function verificarRucClienteExistente(codRuc, distribuidor) {
  try{
    return async function (dispatch) {
      let token = localStorage.getItem("token");
      dispatch({ type: "VERIFICAR_RUC_CLIENTE_EXISTENTE" });
      try{
        const res = await axios.post(
          server + "/pedidos/verificarRucClienteExistente",
          {codRuc, distribuidor},
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        dispatch({ type: "VERIFICAR_RUC_CLIENTE_EXISTENTE_SUCCESS", payload: res.data });
        return res;
      }catch(e){
        dispatch({ type: "VERIFICAR_RUC_CLIENTE_EXISTENTE_FAIL", payload: {} });
        let res = {};
        if (!!e.response) {
          res = e.response;
        }
        return res;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export function listarPDVs(cuenta_comercial) {
  try{
    return async function (dispatch) {
      let token = localStorage.getItem("token");
      dispatch({ type: "LISTAR_PDVS" });
      try{
        const res = await axios.post(
          server + "/pedidos/listarPDVs",
          {cuenta_comercial},
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        dispatch({ type: "LISTAR_PDVS_SUCCESS", payload: res.data });
        return res;
      }catch(e){
        dispatch({ type: "LISTAR_PDVS_FAIL", payload: {} });
        let res = {};
        if (!!e.response) {
          res = e.response;
        }
        return res;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export function listarCiudades() {
  try{
    return async function (dispatch) {
      let token = localStorage.getItem("token");
      dispatch({ type: "LISTAR_CIUDADES" });
      try{
        const res = await axios.post(
          server + "/pedidos/listarCiudades",
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        dispatch({ type: "LISTAR_CIUDADES_SUCCESS", payload: res.data });
        return res;
      }catch(e){
        dispatch({ type: "LISTAR_CIUDADES_FAIL", payload: {} });
        let res = {};
        if (!!e.response) {
          res = e.response;
        }
        return res;
      }
    }
  } catch (e) {
    console.log(e);
  }
}