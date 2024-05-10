import React, { useEffect } from "react";
import Loader from "../../../images/assets/loading/loader.gif";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../../../css/style.css";

const Cargando = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    //timeout para que se vea el loader
    const timer = setTimeout(() => {
      if (auth.isAuthenticated === false) {
        navigate("/");
      }else{
        // if(auth.datosUsuario.cargo==="admin"){
        //   navigate("/dashboard/admin");
        // }else if(auth.datosUsuario.cargo==="soporte"){
        //   navigate("/dashboard/soporte");
        // }else{
        // }
        navigate("/llenarDatos");
      }
    }, 1000);

    // Limpiar el temporizador cuando el componente se desmonte o 'show' cambie
    return () => clearTimeout(timer);

  }, [auth]);

  return (
    <div className="flex w-full justify-center items-center py-40">
      <img src={Loader} alt="loading" />
    </div>
  );
};

export default Cargando;
