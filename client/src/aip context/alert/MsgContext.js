import React from "react";

export const msgContext = React.createContext();

const initState = {
  type: "",
  data: "",
};

const reducer = (state, action) => {
  return action;
};

export default function AuthContext({ children }) {
  const [msg, msgDispatch] = React.useReducer(reducer, initState);

  return (
    <msgContext.Provider value={{ data: msg, dispatch: msgDispatch }}>
      {children}
    </msgContext.Provider>
  );
}
