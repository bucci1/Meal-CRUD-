import axios from "axios";
import {
  PATH_FOOD_GET,
  PATH_FOOD_CREATE,
  PATH_FOOD_UPDATE,
  PATH_FOOD_DELETE,
} from "./config";
import {
  FOOD_GET,
  FOOD_CREATE,
  FOOD_UPDATE,
  FOOD_DELETE,
} from "../aip context/config";

export const getFood = async (foodDispatch, msgDispatch) => {
  try {
    const { data } = await axios.get(PATH_FOOD_GET);
    foodDispatch({ type: FOOD_GET, data: data });
  } catch (err) {
    const errorMessage =
      err.response?.data || "An error occurred while fetching foods";
    msgDispatch({ type: "error", data: errorMessage });
  }
};

export const createFood = async (foodData, foodDispatch, msgDispatch) => {
  try {
    const { data } = await axios.post(PATH_FOOD_CREATE, foodData);
    foodDispatch({
      type: FOOD_CREATE,
      data: data.food,
    });
    msgDispatch("success", "Food created successfully!");
  } catch (err) {
    const errorMessage =
      err.response?.data || "An error occurred while creating food";
    msgDispatch({ type: "error", data: errorMessage });
  }
};

export const updateFood = async (foodData, foodDispatch, msgDispatch) => {
  try {
    const { data } = await axios.put(PATH_FOOD_UPDATE + foodData.id, foodData);
    foodDispatch({
      type: FOOD_UPDATE,
      data: data.food,
    });
    msgDispatch("success", "Food updated successfully!");
  } catch (err) {
    const errorMessage =
      err.response?.data || "An error occurred while updating food";
    msgDispatch({ type: "error", data: errorMessage });
  }
};

export const deleteFood = async (foodData, foodDispatch, msgDispatch) => {
  try {
    const { data } = await axios.delete(PATH_FOOD_DELETE + foodData.id);
    foodDispatch({
      type: FOOD_DELETE,
      data: data.food,
    });
    msgDispatch("success", "Food deleted successfully!");
  } catch (err) {
    const errorMessage =
      err.response?.data || "An error occurred while deleting food";
    msgDispatch({ type: "error", data: errorMessage });
  }
};
