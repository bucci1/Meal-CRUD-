import Modal from "@mui/material/Modal";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Box, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import "../../uitils/utilis.css";
import { updateFood } from "../../api/food";
import useFood from "../../aip context/food/useFood";
import useMsg from "../../aip context/alert/useMsg";

export default function FoodEdit({
  open,
  data,
  handleClose,
  handleOk,
  isEdit,
}) {
  const { foodDispatch } = useFood();
  const { msgDispatch } = useMsg();
  const [food, setFood] = useState({});

  const handleChangeData = (e) => {
    setFood({
      ...food,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    updateFood(food, foodDispatch, msgDispatch);
  };

  useEffect(() => {
    if (data == {} || data == null) {
      setFood({
        title: "",
        desc: "",
        price: "",
        calorie: "",
      });
    } else {
      setFood(data);
    }
  }, [data]);

  return (
    <Modal
      keepMounted
      open={open}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box className="container board">
        <TextField
          label={"Title"}
          className="mb-5 w-100"
          disabled={!isEdit}
          name="title"
          value={food.title}
          onChange={(e) => handleChangeData(e)}
        />
        <TextField
          label={"Description"}
          multiline
          rows={10}
          className="w-100"
          disabled={!isEdit}
          name="desc"
          value={food.desc}
          onChange={(e) => handleChangeData(e)}
        />
        <Box className="container-row mt-5 w-100">
          <TextField
            type="number"
            label={"Price"}
            className="mr-1"
            disabled={!isEdit}
            name="price"
            value={food.price}
            onChange={(e) => handleChangeData(e)}
          />
          <TextField
            type="number"
            label={"Calorie"}
            className="ml-1"
            disabled={!isEdit}
            name="calorie"
            value={food.calorie}
            onChange={(e) => handleChangeData(e)}
          />
        </Box>

        <Grid container spacing={2} className="mt-1">
          <Grid size={11} />
          <Grid size={1}>
            <Box className="w-100 align-right">
              <ButtonGroup disableElevation variant="contained" color="success">
                {isEdit && (
                  <Button
                    color="success"
                    size="large"
                    onClick={() => {
                      if (!data && isEdit) {
                        handleOk(food);
                      } else {
                        handleClose();
                        handleEdit();
                      }
                    }}
                  >
                    Ok
                  </Button>
                )}
                <Button color="error" size="large" onClick={handleClose}>
                  Cancel
                </Button>
              </ButtonGroup>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
