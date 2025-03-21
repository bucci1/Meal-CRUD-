import React from "react";
import {
  FOOD_GET,
  FOOD_CREATE,
  FOOD_UPDATE,
  FOOD_DELETE,
} from "../config";

export const foodContext = React.createContext();

const initState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case FOOD_GET: {
      return action.data;
    }

    case FOOD_CREATE: {
      return [...state, action.data];
    }

    case FOOD_UPDATE: {
      return state.map((food) => {
        if (food.id === action.data.id) { // Use === for strict equality
          return action.data;
        } else {
          return food;
        }
      });
    }

    case FOOD_DELETE: {
      return state.filter((food) => food.id !== action.data.id); // Correct comparison
    }

    default: {
      return state; // Ensure default case for any unhandled actions
    }
  }
};

export default function FooddContext({ children }) {
  const [food, foodDispatch] = React.useReducer(reducer, initState);

  return (
    <foodContext.Provider value={{ data: food, dispatch: foodDispatch }}>
      {children}
    </foodContext.Provider>
  );
}
