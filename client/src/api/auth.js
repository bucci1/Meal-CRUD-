import axios from "axios";
import { PATH_LOGIN, PATH_REGISTER, PATH_UPDATE } from "./config";
import { AUTH_LOGIN, AUTH_UPDATE } from "../aip context/config";
import { storeAuthDataToLocalStorage } from "../uitils/localStorageMng";

/**
 * Helper function to handle API requests and errors efficiently.
 * @param {Function} apiCall - The axios API request function.
 * @param {Function} successCallback - Function to execute on successful request.
 * @param {Function} errorCallback - Function to execute on error.
 */
const handleApiRequest = async (apiCall, successCallback, errorCallback) => {
  try {
    const { data } = await apiCall();
    if (!data) throw new Error("Invalid response from server");
    successCallback?.(data);
    return data;
  } catch (err) {
    console.log(err);
    console.error("API Error:", err);
    const errorMessage =
      err.response?.data?.message || "An unexpected error occurred.";
    errorCallback?.(errorMessage);
    return null;
  }
};

/**
 * Login function
 */
export const authLogin = async (userData, authDispatch, msgDispatch) => {
  console.log("Logging in...");
  await handleApiRequest(
    () => axios.post(PATH_LOGIN, userData),
    (data) => {
      if (!data.token) throw new Error("Invalid response from server");
      authDispatch({
        type: AUTH_LOGIN,
        data: storeAuthDataToLocalStorage(data.token),
      });
      msgDispatch({ type: "success", data: "Log in successfully!" });
    },
    (errorMessage) => {
      console.log(errorMessage);
      msgDispatch({ type: "error", data: errorMessage });
    }
  );
};

/**
 * Register function
 */
export const authRegister = async (userData, msgDispatch) => {
  const success = await handleApiRequest(
    () => axios.post(PATH_REGISTER, userData),
    () => msgDispatch({ type: "success", data: "Registration successful!" }),
    (errorMessage) => msgDispatch({ type: "error", data: errorMessage })
  );

  return success !== null;
};

/**
 * Update authentication info
 */
export const authUpdate = async (userData, authDispatch, msgDispatch) => {
  await handleApiRequest(
    () => axios.post(PATH_UPDATE, userData),
    (data) => authDispatch({ type: AUTH_UPDATE, data }),
    (errorMessage) => msgDispatch({ type: "error", data: errorMessage })
  );
};

/**
 * Update profile function
 */
export const updateProfile = async (userData, authDispatch, msgDispatch) => {
  await handleApiRequest(
    () => axios.put(PATH_UPDATE, userData),
    (data) => {
      if (!data.token) throw new Error("Invalid response from server");
      authDispatch({
        type: AUTH_LOGIN,
        data: storeAuthDataToLocalStorage(data.token),
      });
    },
    (errorMessage) => msgDispatch({ type: "error", data: errorMessage })
  );
};
