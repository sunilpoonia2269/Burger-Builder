import * as actionTypes from "./actionTypes";
import axios from "../../axios-auth";

// Utitlity functions for local storage

const addItemsToLocalStorage = (response) => {
  const expirationDate = new Date(
    new Date().getTime() + response.data.expiresIn * 1000
  );
  localStorage.setItem("token", response.data.idToken);
  localStorage.setItem("userId", response.data.localId);
  localStorage.setItem("expirationDate", expirationDate);
};

const removeItemsFromLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
};

// Auth action creators

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (idToken, localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: localId,
  };
};

const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  };
};

export const authLogout = () => {
  removeItemsFromLocalStorage();
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url = "/accounts:signUp?key=AIzaSyAxs83JzHOE5xk5AMwlpcaiOOanYqN_HmY";
    if (!isSignup) {
      url =
        "/accounts:signInWithPassword?key=AIzaSyAxs83JzHOE5xk5AMwlpcaiOOanYqN_HmY";
    }
    axios
      .post(url, authData)
      .then((response) => {
        addItemsToLocalStorage(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFailed(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const checkAutoSignin = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(authLogout());
      }
    }
  };
};
