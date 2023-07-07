import { React, useState } from "react";
import { Box, AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
const Header = () => {
  //Managing Global states
  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();

  const [value, setValue] = useState();
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h5">BLOG APP</Typography>

          {isLogin && (
            <Box display={"flex"} marginLeft={"auto"} marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => {
                  setValue(val);
                }}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/blog" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                <Tab
                  label="Create Blog"
                  LinkComponent={Link}
                  to="/create-blogs"
                />
              </Tabs>
            </Box>
          )}
          <Box display={"flex"} marginLeft={"auto"}>
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}

            {isLogin && (
              <Button
                sx={{ margin: 1, color: "white" }}
                LinkComponent={Link}
                to="/logout"
                onClick={() => {
                  dispatch(authActions.logout());
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
