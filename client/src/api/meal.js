import axios from "axios";
import {
  PATH_MEAL_GET,
  PATH_MEAL_CREATE,
  PATH_MEAL_UPDATE,
  PATH_MEAL_DELETE,
} from "./config";
import {
  MEAL_GET,
  MEAL_CREATE,
  MEAL_UPDATE,
  MEAL_DELETE,
} from "../aip context/config";
import { getTokenFromLocalStorage } from "../uitils/localStorageMng";

// Set Authorization token globally for axios requests
axios.defaults.headers.common["Authorization"] = getTokenFromLocalStorage();

const handleError = (error, msgDispatch, defaultMessage) => {
  const errorMessage = error.response?.data || defaultMessage;
  msgDispatch({ type: "error", data: errorMessage });
};

// Fetch all meals
export const getMeal = async (mealDispatch, msgDispatch) => {
  try {
    const { data } = await axios.get(PATH_MEAL_GET);
    mealDispatch({
      type: MEAL_GET,
      data,
    });
  } catch (err) {
    handleError(err, msgDispatch, "An error occurred while fetching meals");
  }
};

// Create a new meal
export const createMeal = async (mealData, mealDispatch, msgDispatch) => {
  try {
    const { data } = await axios.post(PATH_MEAL_CREATE, { meal: mealData });
    mealDispatch({
      type: MEAL_CREATE,
      data: data.meal,
    });
    msgDispatch("success", "Meal created successfully!");
  } catch (err) {
    handleError(err, msgDispatch, "An error occurred while creating meal");
  }
};

// Update an existing meal
export const updateMeal = async (mealData, mealDispatch, msgDispatch) => {
  try {
    const { data } = await axios.put(PATH_MEAL_UPDATE, mealData);
    mealDispatch({
      type: MEAL_UPDATE,
      data,
    });
    msgDispatch("success", "Meal updated successfully!");
  } catch (err) {
    handleError(err, msgDispatch, "An error occurred while updating meal");
  }
};

// Delete a meal
export const deleteMeal = async ({ meal: mealData }, mealDispatch, msgDispatch) => {
  try {
    const { data } = await axios.delete(PATH_MEAL_DELETE + mealData.id);
    mealDispatch({
      type: MEAL_DELETE,
      data: data.meal,
    });
    msgDispatch("success", "Meal deleted successfully!");
  } catch (err) {
    handleError(err, msgDispatch, "An error occurred while deleting meal");
  }
};

// Fetch a single meal by ID
export const getAMeal = async (meal, msgDispatch) => {
  try {
    const { data } = await axios.get(PATH_MEAL_GET + meal.id);
    return data;
  } catch (err) {
    handleError(err, msgDispatch, "An error occurred while fetching meal");
  }
};
