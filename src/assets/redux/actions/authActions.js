import axios from "axios";

const server = "http://localhost:10000/genExpertosMarkup"

export function login(username, password) {
    try {
      return function (dispatch) {
        dispatch({ type: "LOGIN" });
        return axios
          .post(server + "/auth/loginApp", {
            username: username,
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

export function logout() {
  try {
    return async function (dispatch) {
      let token = localStorage.getItem("token");

      dispatch({ type: "LOGOUT" });
      try {
        const res = await axios.post(
          server + "/auth/logout",
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        dispatch({ type: "LOGOUT_SUCCESS", payload: res.data });
        return res.data;
      } catch (e) {
        dispatch({ type: "LOGOUT_FAIL", payload: {} });
        let res = {};
        if (!!e.response) {
          res = e.response;
        }
        return res;
      }
    };
  } catch (e) {
    console.log(e);
  }
}

export function notAuthorized() {
  try {
    return function (dispatch) {
      dispatch({
        type: "LOGIN_FAIL",
      });
    };
  } catch (e) {
    throw e;
  }
}