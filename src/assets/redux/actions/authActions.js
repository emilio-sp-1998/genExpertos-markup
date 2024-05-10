import axios from "axios";

const server = "http://localhost:10000/genExpertosMarkup"

export function login(username, password) {
    try {
      return function (dispatch) {
        dispatch({ type: "LOGIN" });
        return axios
          .post(server + "/auth/loginApp", {
            cedula: username,
            contrasena: password,
          })
          .then((res) => {
            localStorage.setItem("token", res.data.jwt);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            return res;
          })
          .catch((e) => {
            dispatch({ type: "LOGIN_FAIL", payload: {} });
            let res = {};
            if (e.response) {
              res = e.response;
            }
            return res;
          });
      };
    } catch (e) {
      console.log(e);
    }
  }