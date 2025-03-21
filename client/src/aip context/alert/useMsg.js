import { useContext } from "react";
import { msgContext } from "./MsgContext";

const useMsg = () => {
  // Destructure msgContext only once for better performance
  const { data: msg, dispatch: msgDispatch } = useContext(msgContext);

  return { msg, msgDispatch };
};

export default useMsg;
