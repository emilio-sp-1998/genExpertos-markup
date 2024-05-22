import React, {useState, useEffect} from 'react'
import { Formik, Form, Field } from 'formik'
import {login, notAuthorized} from '../../../../redux/actions/authActions'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import './Login.css'
import logo from '../../../../../markup.ico'
import logo2 from '../../../../../genomma-lab.ico'
import logo3 from '../../../../../markup2.ico'
import 'bootstrap/dist/css/bootstrap.min.css'
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const formInitialValues = {
        username: "",
        password: "",
    };

    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState("");

    const validateErrors = (values, actions) => {

        const newErrors = {};

        if(!values.username){
            newErrors.username = "Campo Requerido";
        }

        if(!values.password){
            newErrors.password = "Campo Requerido";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            doLoginForm(values, actions)
        }else{
            actions.setSubmitting(false);
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/cargando");
        } else {
          dispatch({ type: "CLEAR_AUTH" });
        }
    }, [isAuthenticated]);

    const doLoginForm = (values, actions) => {
        dispatch(login(values.username, values.password)).then((res) => {
            if (Object.keys(res).length === 0) {
                setLoginError("Algo salio mal");
                actions.setSubmitting(false);
                return;
            } else if (res.status) {
                if (res.data.usuario){
                    if (auth.isAuthenticated) {
                        navigate("/cargando");
                    }
                } else if (
                    res.status === 403 ||
                    res.status === 404 ||
                    res.status === 406 ||
                    res.status === 500 ||
                    res.status === 400 ||
                    res.status === 502
                  ){
                    setLoginError(res.data);
                    if (res.status === 406) {
                        dispatch(notAuthorized());
                    } else {
                        actions.setSubmitting(false);
                        setLoginError(res.data);
                    }
                } else {
                    setLoginError("Algo salio mal");
                }
                actions.setSubmitting(false);
            }
        })
    }

    return(
        <div className='flex min-h-full flex-col justify-center py-20 px-5 sm:px-2 lg:px-8 bg-lila'>
            <div className="py-20">
                <img src={logo3} className='mx-auto object-cover text-center w-80'></img>
            </div>
            {/* <div className="">
                    <img src={logo}></img>
                </div>
                <div className="">
                    <img src={logo2}></img>
                </div> */}
            <div className='py-16 rounded-lg border border-gray-200 w-full sm:w-8/12 md:w-1/3 mx-auto'>
                <div className='p-3 bg-white w-70'>
                    <Formik
                        initialValues={formInitialValues}
                        onSubmit={(values, actions) => {
                            validateErrors(values, actions)
                        }}
                    >
                        {({
                            handleChange,
                            handleSubmit,
                            values,
                            isSubmitting
                        }) => (
                            <Form onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <label htmlFor="username">Username</label>
                                    <input id="username" name="username" type="text" placeholder='Enter Username' className='form-content' 
                                    value={values.username} onChange={handleChange}/>
                                    {errors.username ? (
                                        <div>
                                            <p className="text-sm font-normal text-red-700 mt-1">
                                            {errors.username}
                                            </p>
                                        </div>
                                    ) : null}
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="password">Password</label>
                                    <input id="password" name="password" type="password" placeholder='Enter Password' className='form-content' 
                                    value={values.password} onChange={handleChange}/>
                                    {errors.username ? (
                                        <div>
                                            <p className="text-sm font-normal text-red-700 mt-1">
                                            {errors.password}
                                            </p>
                                        </div>
                                    ) : null}
                                </div>
                                <button type="submit" className='btn btn-success' disabled={isSubmitting}>
                                    {isSubmitting ? "Iniciando..." : "Iniciar sesión"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                    {loginError && (
                        <div className="text-center">
                        <p className="text-sm font-normal text-red-700 mt-4">
                            {loginError}
                        </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Login