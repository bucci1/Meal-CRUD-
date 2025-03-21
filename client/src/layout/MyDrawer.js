import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useNavigate } from "react-router-dom";
import useAuth from "../aip context/auth/useAuth";
import Divider from '@mui/material/Divider';

export default function MyDrawer({ open, setClose }) {
  const {auth} = useAuth();
  const navigate = useNavigate();
  const DrawerList = (
    <Box sx={{ width: 250 }} onClick={setClose}>
      <Box className="title mt-1 mb-1">Meals</Box>
      <Divider className="mb-1"/>
      <Box className="modal-text">{`${auth.u_email}`}</Box>
      <Box className="modal-text">{`${auth.u_name}`}</Box>
      <Divider className="mt-1"/>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/profile")}>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/food")}>
            <ListItemIcon>
              <FastfoodIcon />
            </ListItemIcon>
            <ListItemText primary={"Food"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/meal")}>
            <ListItemIcon>
              <AutoStoriesIcon />
            </ListItemIcon>
            <ListItemText primary={"Meal"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
      <Drawer open={open} onClose={setClose} color="success">
        {DrawerList}
      </Drawer>
    </div>
  );
}
