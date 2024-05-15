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

export function obtenerFarmacia(local, idCliente) {
    try{
      return async function (dispatch) {
        let token = localStorage.getItem("token");
        dispatch({ type: "OBTENER_FARMACIA" });
        console.log(idCliente)
        try{
          const res = await axios.post(
            server + "/pedidos/obtenerFarmacia",
            {local, idCliente},
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