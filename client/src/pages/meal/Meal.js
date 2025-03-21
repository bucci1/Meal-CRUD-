import React, { useEffect, useState } from "react";
import MTable from "../../uitils/MTable";
import Navbar from "../../layout/Navbar";
import { deleteMeal, getAMeal, getMeal } from "../../api/meal";
import useMeal from "../../aip context/meal/useMeal";
import useMsg from "../../aip context/alert/useMsg";
import useFood from "../../aip context/food/useFood";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MealEdit from "./MealEdit";
import useAuth from "../../aip context/auth/useAuth";
const columns = [
  { id: "title", label: "Titlte", minWidth: 170 },
  { id: "date", label: "Date", minWidth: 170 },
  { id: "total_calorie", label: "Total Calorie (Cal)", minWidth: 170 },
  { id: "total_price", label: "Total Price ($)", minWidth: 170 },
];
const data = [
  {
    name: "fff",
    desc: "AAA",
  },
  {
    name: "ggg",
    desc: "BBB",
  },
  {
    name: "fff",
    desc: "AAA",
  },
  {
    name: "ggg",
    desc: "BBB",
  },
  {
    name: "fff",
    desc: "AAA",
  },
  {
    name: "ggg",
    desc: "BBB",
  },
  {
    name: "fff",
    desc: "AAA",
  },
  {
    name: "ggg",
    desc: "BBB",
  },
  {
    name: "fff",
    desc: "AAA",
  },
  {
    name: "ggg",
    desc: "BBB",
  },
  {
    name: "fff",
    desc: "AAA",
  },
  {
    name: "ggg",
    desc: "BBB",
  },
  {
    name: "fff",
    desc: "AAA",
  },
  {
    name: "ggg",
    desc: "BBB",
  },
  {
    name: "fff",
    desc: "AAA",
  },
  {
    name: "ggg",
    desc: "BBB",
  },
  {
    name: "fff",
    desc: "AAA",
  },
  {
    name: "ggg",
    desc: "BBB",
  },
  {
    name: "fff",
    desc: "AAA",
  },
  {
    name: "ggg",
    desc: "BBB",
  },
];

export default function Meal() {
  const { auth } = useAuth();
  const { meals, mealDispatch } = useMeal();
  const [selectedMeal, selectMeal] = useState({});
  const [openView, setOpenView] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const { msgDispatch } = useMsg();
  const handleView = async (meal) => {
    console.log(await getAMeal(meal, msgDispatch));
    selectMeal(await getAMeal(meal, msgDispatch));
    setOpenView(true);
  };
  useEffect(() => {
    getMeal(mealDispatch, msgDispatch);
  }, []);

  const handleDelete = (meal) => {
    console.log(meal);
    deleteMeal(meal, mealDispatch, msgDispatch);
  };
  return (
    <>
      <Navbar />
      <MTable
        title={"My meal"}
        columns={columns}
        data={meals}
        handleView={handleView}
        handleDelete={handleDelete}
        condition={auth.calorie}
      />
      <Button
        className="w-100"
        size="large"
        onClick={() => {
          setOpenNew(true);
        }}
      >
        <AddIcon />
      </Button>
      <MealEdit
        open={openNew}
        isEdit={true}
        handleClose={() => {
          setOpenNew(false);
        }}
      />

      <MealEdit
        data={selectedMeal}
        open={openView}
        isEdit={false}
        handleClose={() => {
          setOpenView(false);
        }}
      />
    </>
  );
}
