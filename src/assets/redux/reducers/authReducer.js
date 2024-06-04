const initial_state = {
    isAuthenticated: false,
    validating: false,
    verifying: false,
    authenticating: false,
    recovering: false,
    hasRecovered: false,
    loading: false,
    tokenApp: "",
    validateEmail: "",
    usuario: "",
    emailVerificacion: null,
    activatingUser: false,
    userActive: false,
    username: "",
    correo_registrado: null,
    isRegister: false,
    isRegistering: false,
    isChangedPassword: false,
    isChanging: false,
    isUpdatingData: false,
    isUpdatedData: false,
    cancelandoTokenContrasenia: false,
};


const authReducer = (state = initial_state, action) => {
    switch (action.type) {
        case "CLEAR_AUTH": return initial_state;

        case "LOGIN": {return{...state, authenticating: true}}
        case "LOGIN_FAIL": {return{...state, authenticating: false, isAuthenticated: false}}
        case "LOGIN_SUCCESS": {return{
            ...state,
            authenticating: false,
            isAuthenticated: true,
            tokenApp: action.payload.jwt,
            usuario: action.payload.usuario,
            datosUsuario: action.payload.datosUsuarios,
            dataNavegacion: action.payload.navigation
        }}
        case "LOGOUT": {return{...state, tokenApp: ""}}
        case "LOGOUT_FAIL": {return{...state, isAuthenticated: false}}
        case "LOGOUT_SUCCESS": return initial_state;
    }
    return state;
}

export default authReducer;