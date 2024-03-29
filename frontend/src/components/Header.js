import React, { useState } from "react";
import { AppBar, Box, Tabs, Tab, Toolbar, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { setupLogoutUser } from "../utils/apiPaths";
import { authActions } from "../store";

axios.defaults.withCredentials = true;

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();

  const sendLogoutRequest = async () => {
    const res = await axios.post(setupLogoutUser, null, {
      withCredentials: true,
    });
    if (res.status === 200) {
      return res;
    }
    return new Error("Unable to Logout, Please try again");
  };

  const handleLogout = () => {
    sendLogoutRequest().then(() => dispatch(authActions.logout()));
  };

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h3"> MERN AUTH </Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Tabs
              indicatorColor="secondary"
              onChange={(e, val) => setValue(val)}
              value={value}
              textColor="inherit"
            >
              {!isLoggedIn && (
                <>
                  <Tab to="/login" LinkComponent={Link} label="Login" />
                  <Tab to="/signup" LinkComponent={Link} label="Signup" />
                </>
              )}
              {isLoggedIn && (
                <Tab
                  to="/"
                  LinkComponent={Link}
                  label="Logout"
                  onClick={handleLogout}
                />
              )}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
