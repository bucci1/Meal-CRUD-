// Define the base URL for the API
const BASE_URL = "http://192.168.11.174:5000";

// AUTH
export const PATH_LOGIN = `${BASE_URL}/users/login`;
export const PATH_REGISTER = `${BASE_URL}/users/register`;
export const PATH_UPDATE = `${BASE_URL}/users/update`;

// FOOD
export const PATH_FOOD_GET = `${BASE_URL}/foods`;
export const PATH_FOOD_CREATE = `${BASE_URL}/foods`;
export const PATH_FOOD_UPDATE = `${BASE_URL}/foods/`;  // ID will be appended dynamically
export const PATH_FOOD_DELETE = `${BASE_URL}/foods/`;  // ID will be appended dynamically

// MEAL
export const PATH_MEAL_GET = `${BASE_URL}/meals/`;  // ID will be appended dynamically
export const PATH_MEAL_CREATE = `${BASE_URL}/meals/`;
export const PATH_MEAL_UPDATE = `${BASE_URL}/meals/update`;  // Consider making this dynamic with an ID
export const PATH_MEAL_DELETE = `${BASE_URL}/meals/`;  // ID will be appended dynamically
