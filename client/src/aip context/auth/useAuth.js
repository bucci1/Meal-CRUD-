import { useContext } from "react";
import { authContext } from "./AuthContext";

const useAuth = () => {
  const auth = useContext(authContext).data;
  const authDispatch = useContext(authContext).dispatch;

  return { auth, authDispatch };
};

export default useAuth;
