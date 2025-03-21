import { useContext } from "react";
import { foodContext } from "./FoodContext";

const useFood = () => {
  const foods = useContext(foodContext).data;
  const foodDispatch = useContext(foodContext).dispatch;

  return { foods, foodDispatch };
};

export default useFood;
