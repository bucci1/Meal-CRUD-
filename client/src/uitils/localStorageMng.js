import { jwtDecode } from "jwt-decode";

export const storeAuthDataToLocalStorage = (token) => {
  if (!token) return null;

  const userData = jwtDecode(token);
  if (!userData) return null;

  localStorage.setItem(
    "auth",
    JSON.stringify({
      token,
      user: userData,
    })
  );

  return userData;
};

export const getUserDataFromLocalStorage = () => {
  const authData = JSON.parse(localStorage.getItem("auth"));
  return authData?.user || null;
};

export const getTokenFromLocalStorage = () => {
  const authData = JSON.parse(localStorage.getItem("auth"));
  console.log(authData);
  return authData?.token || null;
};

export const clearAuthData = () => {
  localStorage.removeItem("auth");
};

const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
