"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/actions/authActions";
import CargandoPersist from "./CargandoPersist";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout()).then(() => {
      dispatch({ type: "CLEAR_AUTH" });
      dispatch({ type: "CLEAR_DATOSGENERALES" });
      dispatch({ type: "CLEAR_CONSULTORIOS" });
      dispatch({ type: "CLEAR_DATOSPRECIOS" });
      dispatch({ type: "CLEAR_RESUMEN" });
      dispatch({ type: "CLEAR_UPDATED_DATA" });
      dispatch({ type: "CLEAR_REGISTER_USER" });
      dispatch({ type: "CLEAR_CHANGE_PASSWORD" });
      dispatch({ type: "CLEAR_CONFIGURACION" });
      dispatch({ type: "CLEAR_DOCTORES" });
      dispatch({ type: "CLEAR_INGRESO" });
      dispatch({ type: "CLEAR_INVENTARIO" });
      dispatch({ type: "CLEAR_CITAS" });
      dispatch({ type: "CLEAR_PACIENTES" });
      dispatch({ type: "CLEAR_PRIVACIDAD" });
      
      navigate("/");
    });
  }, []);

  return <CargandoPersist />;
};
export default Logout;
