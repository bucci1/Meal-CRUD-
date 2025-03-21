import React, { useEffect, useState } from "react";
import MTable from "../../uitils/MTable";
import { createFood, deleteFood, getFood } from "../../api/food";
import useMsg from "../../aip context/alert/useMsg";
import useFood from "../../aip context/food/useFood";
import FoodEdit from "./FoodEdit";
import Confirm from "../../uitils/Confirm";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useAuth from "../../aip context/auth/useAuth";
import Navbar from "../../layout/Navbar";

const columns = [
  { id: "title", label: "Title", minWidth: 170 },
  { id: "desc", label: "Descriptioni", minWidth: 170 },
  { id: "price", label: "Price ($)", minWidth: 170 },
  { id: "calorie", label: "Calorie (Cal)", minWidth: 170 },
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
export default function Food() {
  const { auth } = useAuth();
  const { msg, msgDispatch } = useMsg();
  const { foods, foodDispatch } = useFood();
  const [selectedFood, selectFood] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const handleDelete = () => {
    deleteFood(selectedFood, foodDispatch, msgDispatch);
  };
  const handleCreateFood = (food) => {
    createFood(food, foodDispatch, msgDispatch);
  };
  useEffect(() => {
    getFood(foodDispatch, msgDispatch);
  }, []);
  return (
    <>
      <Navbar />
      <MTable
      title={"Foods"}
        columns={columns}
        data={foods}
        handleView={(food) => {
          setIsEdit(false);
          selectFood(food);
          setOpen(true);
        }}
        handleEdit={
          auth.u_level == 3 &&
          ((food) => {
            setIsEdit(true);
            selectFood(food);
            setOpen(true);
          })
        }
        handleDelete={
          auth.u_level == 3 &&
          ((food) => {
            selectFood(food);
            setOpenConfirm(true);
          })
        }
      />
      <Button
        size="large"
        color="inherit"
        className="w-100"
        onClick={() => {
          setOpenNew(true);
        }}
      >
        <AddIcon />
      </Button>
      <FoodEdit
        open={open}
        data={selectedFood}
        isEdit={isEdit}
        handleClose={() => setOpen(false)}
      />

      <FoodEdit
        open={openNew}
        isEdit={true}
        handleClose={() => setOpenNew(false)}
        handleOk={(food) => {
          handleCreateFood(food);
          setOpenNew(false);
        }}
      />

      <Confirm
        open={openConfirm}
        title={"Confirm"}
        text={`Do you want to delete "${selectedFood.title}"?`}
        handleClose={() => {
          setOpenConfirm(false);
        }}
        handleOk={() => {
          setOpenConfirm(false);
          handleDelete();
        }}
      />
    </>
  );
}
