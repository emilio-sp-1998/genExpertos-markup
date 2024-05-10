import React, {useState} from 'react'
import { Formik, Form, Field } from 'formik'
import {login} from '../../../../redux/actions/authActions'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
            //xd
        }else{
            actions.setSubmitting(false);
        }
    }

    const doLoginForm = (values, actions) => {
        dispatch(login(values.username, values.password)).then((res) => {
            if (Object.keys(res).length === 0) {
                setLoginError("Algo salio mal");
                actions.setSubmitting(false);
                return;
            } else if (res.status) {
                
            }
        })
    }

    return(
        <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
            <div className='p-3 bg-white w-25'>
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
                                <input type="text" placeholder='Enter Username' className='form-content' 
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
                                <input type="password" placeholder='Enter Password' className='form-content' 
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
    )
}

export default Login