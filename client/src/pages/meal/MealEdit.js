import * as React from "react";
import Modal from "@mui/material/Modal";
import { Button, Container, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import "./meal.css";
import useFood from "../../aip context/food/useFood";
import useMsg from "../../aip context/alert/useMsg";
import { getFood } from "../../api/food";
import dayjs from "dayjs";
import { createMeal } from "../../api/meal";
import useMeal from "../../aip context/meal/useMeal";

const getFormattedDate = () => {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return new Date().toLocaleDateString("en-GB", options).replace(",", "");
};

const mealTime = ["Breakfast", "Lunch", "Dinner"];

export default function MealEdit({ title, data, open, isEdit, handleClose }) {
  const [foodBuffer, selectFood] = React.useState([]);
  const [totlaPrice, setTotalPrice] = React.useState(0);
  const [totalCalorie, setTotalCalorie] = React.useState(0);
  const { foods, foodDispatch } = useFood();
  const { mealDispatch } = useMeal();
  const { msgDispatch } = useMsg();
  const [mealData, setMealData] = React.useState({
    date: getFormattedDate(),
    foods: [],
    title: "Breakfast",
  });

  React.useEffect(() => {
    console.log(mealData);
  }, [mealData]);

  const handleChangeMealTime = (e) => {
    setMealData({
      ...mealData,
      title: e.target.value,
    });
  };

  const handleChangeMealDate = (e) => {
    console.log(e);
    setMealData({
      ...mealData,
      date: e.format("DD MMM YYYY"),
    });
  };

  const handleSeletectFood = (food) => {
    if (!mealData?.foods.some((f) => f.id == food.id)) {
      setMealData({
        ...mealData,
        foods: [...mealData.foods, food],
      });
      setTotalCalorie(parseInt(totalCalorie) + parseInt(food.calorie));
      setTotalPrice(parseInt(totlaPrice) + parseInt(food.price));
    }
  };

  const handleRemoveFood = (food) => {
    if (mealData?.foods.some((f) => f.id == food.id)) {
      setMealData({
        ...mealData,
        foods: mealData.foods.filter((f) => f.id != food.id),
      });
      setTotalCalorie(parseInt(totalCalorie) - parseInt(food.calorie));
      setTotalPrice(parseInt(totlaPrice) - parseInt(food.price));
    }
  };

  const handleInit = () => {
    setTotalCalorie(0);
    setTotalPrice(0);
    setMealData({
      ...mealData,
      foods: [],
      time: getFormattedDate(),
      title: "Breakfast",
    });
  };

  const handleCreateMeal = () => {
    createMeal(mealData, mealDispatch, msgDispatch);
    handleClose();
    handleInit();
  };

  const handleUpdateMeal = () => {};

  const handleOk = () => {
    console.log(data, isEdit);
    if (!data && isEdit) {
      handleCreateMeal();
    } else {
      handleUpdateMeal();
    }
  };

  React.useEffect(() => {
    selectFood([]);
  }, [open]);

  React.useEffect(() => {
    getFood(foodDispatch, msgDispatch);
  }, []);

  React.useEffect(() => {
    if (data && Object.keys(data).length > 0 && data.foods != undefined) {
      setMealData({
        ...data.meal, // Spread meal properties
        foods: data.foods, // Assign foods separately
      });
      let total_calorie = 0;
      let total_price = 0;

      data.foods.forEach((f) => {
        total_calorie += f.calorie;
        total_price += Number(f.price);
      });
      setTotalCalorie(total_calorie);
      setTotalPrice(total_price);
    }
  }, [data]);

  React.useEffect(() => {
    console.log(mealData);
  }, [mealData]);
  return (
    <>
      <Modal
        keepMounted
        open={open}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Container maxWidth="sm" className="board">
          <Grid container spacing={2}>
            <Grid item size={12}>
              <Typography className="modal-title">{title}</Typography>
            </Grid>
            <Grid item size={6} />
            <Grid item size={3}>
              <Typography className="modal-text">{`Price : ${totlaPrice}$`}</Typography>
            </Grid>
            <Grid item size={3}>
              <Typography className="modal-text">{`Calorie : ${totalCalorie} Cal`}</Typography>
            </Grid>

            <Grid size={6}>
              <List className="food-list">
                {foods.map((food, index) => (
                  <ListItem
                    key={food}
                    disablePadding
                    secondaryAction={
                      !mealData.foods.some((f) => f.id === food.id) &&
                      isEdit && (
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleSeletectFood(food)}
                        >
                          <ShoppingCartIcon />
                        </IconButton>
                      )
                    }
                  >
                    <ListItemButton>
                      <ListItemText primary={food.title} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid size={6}>
              <List className="food-list">
                {mealData.foods.map((food, index) => (
                  <ListItem
                    key={food}
                    disablePadding
                    secondaryAction={
                      isEdit && (
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleRemoveFood(food)}
                        >
                          <CloseIcon />
                        </IconButton>
                      )
                    }
                  >
                    <ListItemButton>
                      <ListItemText primary={food.title} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid size={6} className="mt-5">
              <TextField
                select
                label="Time"
                defaultValue="Breakfast"
                className="w-100"
                disabled={!isEdit}
                onChange={(e) => handleChangeMealTime(e)}
              >
                {mealTime.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={6} className="mt-5">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disabled={!isEdit}
                  format="MMM DD YYYY"
                  onChange={handleChangeMealDate}
                  value={dayjs(mealData.date)}
                />
              </LocalizationProvider>
            </Grid>

            <Grid size={8} />
            <Grid item size={4}>
              <ButtonGroup disableElevation variant="contained" color="success">
                <Button color="success" size="large" onClick={handleOk}>
                  Ok
                </Button>
                <Button
                  color="error"
                  size="large"
                  onClick={() => {
                    handleInit();
                    handleClose();
                  }}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid size={12}>
              <Grid size={10}></Grid>
              <Grid size={2}></Grid>
            </Grid>
          </Grid>
        </Container>
      </Modal>
    </>
  );
}
