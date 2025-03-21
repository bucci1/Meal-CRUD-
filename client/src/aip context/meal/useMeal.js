import { useContext } from "react";
import { mealContext } from "./MealContext";

const useMeal = () => {
  const meals = useContext(mealContext).data;
  const mealDispatch = useContext(mealContext).dispatch;

  return { meals, mealDispatch };
};

export default useMeal;
