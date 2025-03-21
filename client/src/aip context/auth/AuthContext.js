import React from "react";
import { AUTH_LOGIN, AUTH_UPDATE } from "../config";
import { getUserDataFromLocalStorage } from "../../uitils/localStorageMng";

export const authContext = React.createContext();

let storedData = getUserDataFromLocalStorage();
const initState = storedData ? {
  ...storedData,
  isAuthenticated: true
}: {
  u_id: "",
  u_email: "",
  u_name: "",
  u_level: "",
  u_calorie: "",
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...action.data,
        isAuthenticated: Boolean(action.data)
      }
    case AUTH_UPDATE:
      return {
        ...state,
        ...action.data,
      };
  }
};

export default function AuthContext({ children }) {
  const [auth, authDispatch] = React.useReducer(reducer, initState);

  return (
    <authContext.Provider value={{ data: auth, dispatch: authDispatch }}>
      {children}
    </authContext.Provider>
  );
}
