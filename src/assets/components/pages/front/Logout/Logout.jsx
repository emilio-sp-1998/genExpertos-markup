"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../../redux/actions/authActions";
import CargandoPersist from '../../backend/CargandoPersist'


const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(logout()).then(() => {
        dispatch({ type: "CLEAR_AUTH" });
        
        navigate("/");
      });
    }, []);
  
    return <CargandoPersist />;
  };
  export default Logout;