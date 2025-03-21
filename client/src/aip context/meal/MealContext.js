import React from "react";
import { MEAL_GET, MEAL_CREATE, MEAL_UPDATE, MEAL_DELETE } from "../config";

export const mealContext = React.createContext();

const initState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case MEAL_GET: {
      return action.data;
    }

    case MEAL_CREATE: {
      return [...state, action.data];
    }

    case MEAL_UPDATE: {
      return state.map((meal) => {
        if (meal.id == action.data.id) {
          return action.data;
        } else {
          return meal;
        }
      });
    }

    case MEAL_DELETE: {
      console.log(action);
      return state.filter((meal) => (meal.id != action.data.id));
    }
  }
};

export default function MealContext({ children }) {
  const [meal, mealDispatch] = React.useReducer(reducer, initState);

  return (
    <mealContext.Provider value={{ data: meal, dispatch: mealDispatch }}>
      {children}
    </mealContext.Provider>
  );
}
