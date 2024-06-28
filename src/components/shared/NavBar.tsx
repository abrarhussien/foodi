import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../assets/logo.svg";
import { Divider, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CartContext from "../../context/CartProvider";
import axios from "axios";
import socket from "../../utils/socket";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

const url = "https://back-end-j1bi.onrender.com/api/v1";

const pages = ["Home", "Restaurants", "why us"];

function NavBar({
  isUser,
  setisUser,
  whyUsRef,
}: {
  isUser: boolean;
  setisUser: React.Dispatch<React.SetStateAction<boolean>>;
  whyUsRef: React.MutableRefObject<undefined>;
}) {
  //@ts-ignore
  const { cartQuantity } = React.useContext(CartContext);
  const [notifications, setNotifications] = React.useState<any>([]);
  const [newNotification, setNewNotification] = React.useState<any>({});
  const [showNotifications, setShowNotifications] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToWhyUs = () => {
    const { current } = whyUsRef;
    if (current !== null) {
      //@ts-ignore
      current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setisUser(false);
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleGetNotifications = async () => {
    if (isUser) {
      const res = await axios.get(url + "/notification/user", {
        headers: { jwt: localStorage.getItem("token") },
      });

      if (res.status == 200) {
        setNotifications(res.data);
      }
    }
  };

  const handleGetNotificationById = async (id: string) => {
    if (isUser) {
      const res = await axios.get(url + "/notification/user/" + id, {
        headers: { jwt: localStorage.getItem("token") },
      });

      if (res.status == 200) {
        setNewNotification(res.data);
      }
    }
  };

  const handleDate = (date: any) => {
    date = new Date(date);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const dayOfWeekIndex = date.getDay();
    const dayOfWeek = daysOfWeek[dayOfWeekIndex];

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${dayOfWeek}, ${hours}:${minutes}`;
  };

  React.useEffect(() => {
    if (isUser) {
      handleGetNotifications();

      const decoded: any = jwtDecode(localStorage.getItem("token")!);

      socket.on("connect", () => {
        socket.emit("join-room", decoded._id);
        socket.on("notify-user", (data) => handleGetNotificationById(data));
      });

      return () => {
        socket.off("connect");
      };
    }
  }, []);

  React.useEffect(() => {
    setNotifications((pre: any) => [newNotification, ...pre]);
  }, [newNotification]);

  return (
    <AppBar position="static" sx={{ backgroundColor: "inherit", boxShadow: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: "112px" }}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ width: "100%" }}
          >
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ color: "#0a0a0a" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      handleCloseNavMenu();
                      if (page == "Restaurants") {
                        navigate("/restaurants");
                      } else if (page.toLowerCase() === "why us") {
                        location.pathname == "/"
                          ? scrollToWhyUs()
                          : navigate("/", { state: { section: "why us" } });
                      } else {
                        navigate("/");
                      }
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
                <Divider />
                {isUser && (
                  <MenuItem
                    sx={{ display: { sm: "none" } }}
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <Typography textAlign="center">profile</Typography>
                  </MenuItem>
                )}
                {isUser && <Divider sx={{ display: { sm: "none" } }} />}
                {!isUser && (
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate("/login");
                    }}
                  >
                    <Typography textAlign="center" color="primary">
                      log in
                    </Typography>
                  </MenuItem>
                )}
                {isUser && (
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      handleLogOut();
                    }}
                  >
                    <Typography textAlign="center" color="primary">
                      log out
                    </Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
            <Button
              onClick={() => navigate("/")}
              sx={{
                display: { xs: "flex", md: "none" },
                position: "absolute",
                left: "50%",
                translate: "-50%",
                mr: 3,
                flexGrow: 100,
              }}
            >
              <img src={logo} alt="" />
            </Button>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                justifyContent: "start",
              }}
            >
              <Button onClick={() => navigate("/")}>
                <img src={logo} alt="" />
              </Button>
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    if (page == "Restaurants") {
                      navigate("/restaurants");
                    } else if (page.toLowerCase() === "why us") {
                      location.pathname == "/"
                        ? scrollToWhyUs()
                        : navigate("/", { state: { section: "why us" } });
                    } else {
                      navigate("/");
                    }
                  }}
                  sx={{
                    my: 2,
                    marginInline: "1rem",
                    display: "block",
                    color: "#0a0a0a",
                    fontWeight: "700",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Stack
              direction={"row"}
              sx={{ height: "40px" }}
              alignItems={"center"}
            >
              <Button onClick={() => navigate("./cart")}>
                <svg
                  width="24"
                  height="64"
                  viewBox="0 0 24 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 38C15.89 38 15 38.89 15 40C15 40.5304 15.2107 41.0391 15.5858 41.4142C15.9609 41.7893 16.4696 42 17 42C17.5304 42 18.0391 41.7893 18.4142 41.4142C18.7893 41.0391 19 40.5304 19 40C19 39.4696 18.7893 38.9609 18.4142 38.5858C18.0391 38.2107 17.5304 38 17 38ZM1 22V24H3L6.6 31.59L5.24 34.04C5.09 34.32 5 34.65 5 35C5 35.5304 5.21071 36.0391 5.58579 36.4142C5.96086 36.7893 6.46957 37 7 37H19V35H7.42C7.3537 35 7.29011 34.9737 7.24322 34.9268C7.19634 34.8799 7.17 34.8163 7.17 34.75C7.17 34.7 7.18 34.66 7.2 34.63L8.1 33H15.55C16.3 33 16.96 32.58 17.3 31.97L20.88 25.5C20.95 25.34 21 25.17 21 25C21 24.7348 20.8946 24.4804 20.7071 24.2929C20.5196 24.1054 20.2652 24 20 24H5.21L4.27 22M7 38C5.89 38 5 38.89 5 40C5 40.5304 5.21071 41.0391 5.58579 41.4142C5.96086 41.7893 6.46957 42 7 42C7.53043 42 8.03914 41.7893 8.41421 41.4142C8.78929 41.0391 9 40.5304 9 40C9 39.4696 8.78929 38.9609 8.41421 38.5858C8.03914 38.2107 7.53043 38 7 38Z"
                    fill="#111111"
                  />
                </svg>
                {!!cartQuantity && (
                  <Box
                    sx={{
                      height: "24px",
                      width: "24px",
                      borderRadius: "50%",
                      bgcolor: "black",
                      color: "white",
                    }}
                  >
                    {cartQuantity}
                  </Box>
                )}
              </Button>
              {isUser && (
                <Button
                  onClick={() => navigate("/userinfo")}
                  sx={{ display: { xs: "none", sm: "inline-flex" } }}
                >
                  <svg
                    width="24"
                    height="64"
                    viewBox="0 0 24 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.6499 40.6251C21.5841 40.7391 21.4894 40.8338 21.3753 40.8997C21.2613 40.9655 21.1319 41.0001 21.0002 41.0001H3.00021C2.86862 41 2.73938 40.9652 2.62548 40.8993C2.51157 40.8335 2.417 40.7388 2.35127 40.6248C2.28553 40.5108 2.25094 40.3815 2.25098 40.2499C2.25101 40.1183 2.28566 39.9891 2.35146 39.8751C3.77927 37.4067 5.97958 35.6367 8.54739 34.7976C7.27724 34.0415 6.29041 32.8893 5.73845 31.518C5.18648 30.1468 5.09991 28.6322 5.49203 27.207C5.88414 25.7818 6.73326 24.5247 7.90898 23.6287C9.0847 22.7328 10.522 22.2476 12.0002 22.2476C13.4784 22.2476 14.9157 22.7328 16.0914 23.6287C17.2672 24.5247 18.1163 25.7818 18.5084 27.207C18.9005 28.6322 18.8139 30.1468 18.262 31.518C17.71 32.8893 16.7232 34.0415 15.453 34.7976C18.0208 35.6367 20.2211 37.4067 21.649 39.8751C21.7149 39.989 21.7497 40.1183 21.7499 40.25C21.7501 40.3816 21.7156 40.511 21.6499 40.6251Z"
                      fill="#111111"
                    />
                  </svg>
                </Button>
              )}

              {isUser && (
                /*********************/
                <Box position={"relative"}>
                  <Button
                    onClick={() => {
                      setShowNotifications((pre) => !pre);
                      if (newNotification._id) {
                        setNewNotification({});
                      }
                    }}
                  >
                    {newNotification._id ? (
                      <svg
                        width="24"
                        height="64"
                        viewBox="0 0 24 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 26.5C21 28.43 19.43 30 17.5 30C15.57 30 14 28.43 14 26.5C14 24.57 15.57 23 17.5 23C19.43 23 21 24.57 21 26.5ZM19 31.79C18.5 31.92 18 32 17.5 32C16.0421 31.9974 14.6447 31.4171 13.6138 30.3862C12.583 29.3553 12.0026 27.9579 12 26.5C12 25.03 12.58 23.7 13.5 22.71C13.3185 22.4875 13.0897 22.3084 12.8302 22.1855C12.5707 22.0627 12.2871 21.9993 12 22C10.9 22 10 22.9 10 24V24.29C7.03 25.17 5 27.9 5 31V37L3 39V40H21V39L19 37V31.79ZM12 43C13.11 43 14 42.11 14 41H10C10 41.5304 10.2107 42.0391 10.5858 42.4142C10.9609 42.7893 11.4696 43 12 43Z"
                          fill="#111111"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.9997 2C10.1432 2 8.36269 2.7375 7.04994 4.05025C5.73718 5.36301 4.99969 7.14348 4.99969 9V12.528C4.99983 12.6831 4.96388 12.8362 4.89469 12.975L3.17769 16.408C3.09381 16.5757 3.05421 16.7621 3.06263 16.9494C3.07106 17.1368 3.12724 17.3188 3.22583 17.4783C3.32442 17.6379 3.46216 17.7695 3.62595 17.8608C3.78975 17.9521 3.97416 18 4.16169 18H19.8377C20.0252 18 20.2096 17.9521 20.3734 17.8608C20.5372 17.7695 20.675 17.6379 20.7735 17.4783C20.8721 17.3188 20.9283 17.1368 20.9367 16.9494C20.9452 16.7621 20.9056 16.5757 20.8217 16.408L19.1057 12.975C19.0361 12.8362 18.9999 12.6832 18.9997 12.528V9C18.9997 7.14348 18.2622 5.36301 16.9494 4.05025C15.6367 2.7375 13.8562 2 11.9997 2ZM11.9997 21C11.379 21.0003 10.7736 20.8081 10.2667 20.4499C9.75985 20.0917 9.37657 19.5852 9.16969 19H14.8297C14.6228 19.5852 14.2395 20.0917 13.7327 20.4499C13.2258 20.8081 12.6203 21.0003 11.9997 21Z"
                          fill="#111111"
                        />
                      </svg>
                    )}
                  </Button>
                  {showNotifications && (
                    <Stack
                      position={"absolute"}
                      alignItems={"flex-end"}
                      right={0}
                      zIndex={1}
                    >
                      <Box
                        sx={{
                          width: 0,
                          height: 0,
                          borderLeft: "10px solid transparent",
                          borderRight: "10px solid transparent",

                          borderBottom: "10px solid black",
                          marginRight: "20px",
                        }}
                      ></Box>

                      <Stack
                        sx={{
                          width: "400px",
                          maxHeight: "350px",
                          border: "black solid 1px",
                          backgroundColor: "#E8DCCC",
                          borderRadius: "20px 0 0 20px",
                          padding: "20px",
                          overflow: "scroll",
                          overflowX: "hidden",
                        }}
                        alignItems={"flex-start"}
                      >
                        {notifications.length
                          ? notifications.map((notification: any) => (
                              <Stack
                                direction={"row"}
                                color={"black"}
                                alignItems={"center"}
                                marginBottom={"10px"}
                                key={notification?._id}
                              >
                                <img
                                  src={
                                    notification?.notificationType
                                      ?.restaurantIcon
                                  }
                                  title="icon"
                                  style={{
                                    objectFit: "cover",
                                    width: "64px",
                                    height: "64px",
                                    borderRadius: "50%",
                                    marginRight: "10px",
                                  }}
                                />
                                <Box>
                                  <Stack direction={"row"}>
                                    {" "}
                                    <Typography>
                                      Your order has been{" "}
                                    </Typography>
                                    <Typography
                                      fontWeight={"bold"}
                                      marginLeft={"5px"}
                                    >
                                      {notification?.notificationType?.name}
                                    </Typography>
                                  </Stack>
                                  <Typography fontSize={"small"} color={"gray"}>
                                    {handleDate(notification?.createdAt)}
                                  </Typography>
                                </Box>
                              </Stack>
                            ))
                          : ""}
                      </Stack>
                    </Stack>
                  )}
                </Box>
              )}

              {!isUser && (
                <>
                  {" "}
                  <Button
                    onClick={() => navigate("/register")}
                    variant="outlined"
                    color="primary"
                    sx={{
                      width: "192px",
                      borderRadius: "50px",
                      marginInline: "1rem",
                      display: { xs: "none", lg: "flex" },
                      height: "100%",
                    }}
                  >
                    sign up
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/login");
                    }}
                    variant="contained"
                    color="primary"
                    sx={{
                      width: "192px",
                      borderRadius: "50px",
                      marginInline: "1rem",
                      display: { xs: "none", md: "flex" },
                      height: "100%",
                    }}
                  >
                    sign in
                  </Button>
                </>
              )}
              {isUser && (
                <>
                  {" "}
                  <Button
                    onClick={handleLogOut}
                    variant="contained"
                    color="primary"
                    sx={{
                      width: "192px",
                      borderRadius: "50px",
                      marginInline: "1rem",
                      display: { xs: "none", md: "flex" },
                      height: "100%",
                    }}
                  >
                    sign out
                  </Button>
                </>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
