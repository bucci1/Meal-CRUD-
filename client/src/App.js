import "./App.css";
import { Box } from "@mui/material";
import React from "react";
import AuthRouter from "./router/AuthRouter";
import AuthContext from "./aip context/auth/AuthContext";
import MsgProvider from "./aip context/alert/MsgContext";
import FooddContext from "./aip context/food/FoodContext";
import MealContext from "./aip context/meal/MealContext";
import SAlert from "./uitils/SAlert";

function App() {

  return (
    <Box className="main-board container w-100">
      <AuthContext>
        <MsgProvider>
          <FooddContext>
            <MealContext>
              <AuthRouter />
              <SAlert/>
            </MealContext>
          </FooddContext>
        </MsgProvider>
      </AuthContext>
    </Box>
  );
}

export default App;
