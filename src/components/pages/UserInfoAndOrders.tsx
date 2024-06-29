import {
  Grid,
  Typography,
  TextField,
  Button,
  useTheme,
  Box,
} from "@mui/material";
import OrderDetailsPopup from "./OrderDetailsPopup";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IUser } from "../../models/user.model";
import { IOrder } from "../../models/order.model";
import { IPhone } from "../../models/phone.model";
import { IItem } from "../../models/item.model";
import { IRestaurant } from "../../models/restaurant.model";
import Loading from "../shared/Loading";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UserInfoAndOrders = () => {
  const axiosPrivate = useAxiosPrivate();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = React.useState<IUser>({
    _id: "",
    fullName: "",
    email: "",
    image: "",
  });
  const [restaurants, setRestaurants] = React.useState<IRestaurant[]>([]);
  const [phones, setPhones] = React.useState<IPhone[]>([]);
  const [items, setItems] = React.useState<IItem[]>([]);
  const [orders, setOrders] = React.useState<IOrder[]>([]);
  const [order, setOrder] = React.useState<any>({});

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [firstPhone, setFirstPhone] = useState("");
  const [secondPhone, setSecondPhone] = useState("");

  const [firstPhoneError, setFirstPhoneError] = useState(false);
  const [secondPhoneError, setSecondPhoneError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

  const [isEditMode, setIsEditMode] = useState(false);

  const handleOpen = (order: IOrder) => {
    setOpen(true);
    setOrder(order);
  };
  const handleClose = () => setOpen(false);

  const handleGetUser = async () => {
    setLoading(true);
    const res = await axiosPrivate.get("/api/v1/user");

    setUser(res.data);
  };

  const handleGetRestaurants = async () => {
    const res = await axiosPrivate.get("/api/v1/restaurant");

    setRestaurants(res.data);
    setLoading(false);
  };

  const handleGetPhoneNumbers = async () => {
    const res = await axiosPrivate.get("/api/v1/phones");

    setPhones(res.data);
  };

  const handleGetUserOrders = async () => {
    const res = await axiosPrivate.get("/api/v1/orders/user");

    setOrders(res.data?.orders);
    setItems(res.data?.items);
  };

  const handleUpdateName = async (fullName: string) => {
    await axiosPrivate.patch(
      "/api/v1/user",
      { fullName }
    );
  };

  const handleUpdatePhone = async (phoneNumber: string, phoneId: string) => {
    await axiosPrivate.patch(
      "/api/v1/phones/" + phoneId,
      { phoneNumber }
    );
  };

  const handleCreatePhone = async (phoneNumber: string) => {
    await axiosPrivate.post(
      "/api/v1/phones",
      { phoneNumber }
    );
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const regex = /^[0-9]*$/;
    return regex.test(phoneNumber);
  };

  const handleOnEdit = () => {
    if (isEditMode) {
      let isValid = true;

      if (!validatePhoneNumber(firstPhone)) {
        setFirstPhoneError(true);
        isValid = false;
      } else {
        setFirstPhoneError(false);
      }

      if (secondPhone && !validatePhoneNumber(secondPhone)) {
        setSecondPhoneError(true);
        isValid = false;
      } else {
        setSecondPhoneError(false);
      }

      if (isValid) {
        handleUpdateName(fullName);

        if (phones[0]) handleUpdatePhone(firstPhone, phones[0]?._id);
        else if (firstPhone) handleCreatePhone(firstPhone);

        if (phones[1]) handleUpdatePhone(secondPhone, phones[1]?._id);
        else if (secondPhone) handleCreatePhone(secondPhone);

        setIsEditMode(false);
      }
    } else {
      setIsEditMode(true);
    }
  };

  const handleTotalPrice = (orderId: string) => {
    const filteredItems = items.filter((item) => item.orderId === orderId);
    let totalPrice = 0;

    filteredItems.forEach((ele) => {
      totalPrice += ele.productId.price * ele.quantity;
    });

    return totalPrice;
  };

  const handleGetRestaurantName = (orderId: string) => {
    const item = items.find((item: IItem) => item.orderId === orderId);
    const res = restaurants.find(
      (restaurant) => restaurant._id === item?.productId.restaurantId
    );

    return res?.name;
  };

  useEffect(() => {
    handleGetUser();
    handleGetPhoneNumbers();
    handleGetUserOrders();
    handleGetRestaurants();
  }, []);

  useEffect(() => {
    setFullName(user?.fullName);
    setEmail(user?.email);
  }, [user]);

  useEffect(() => {
    setFirstPhone(phones[0]?.phoneNumber);
    setSecondPhone(phones[1]?.phoneNumber);
  }, [phones]);

  useEffect(() => {
    const isValid =
      validatePhoneNumber(firstPhone) &&
      (!secondPhone || validatePhoneNumber(secondPhone));

    setIsFormValid(isValid);
  }, [firstPhone, secondPhone]);

  return (
    <>
      {loading && <Loading />}
      <Grid container marginBlock={"100px"} justifyContent={"center"}>
        <Grid
          item
          xs={12}
          xl={7}
          margin={{ xl: "0 20px 0 0", xs: "20px" }}
          sx={{
            backgroundColor: theme.palette.secondary.main,
            borderRadius: "25px",
            padding: { xs: "20px", md: "25px" },
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: { xs: "20px", md: "30px" },
              mt: "32px",
              fontSize: { xs: "24px", md: "28px" },
            }}
          >
            User Info
          </Typography>
          <Box sx={{ mb: { xs: "10px", md: "19px" } }}>
            <Typography
              variant="body1"
              gutterBottom
              fontSize={{ xs: "18px", md: "20px" }}
              sx={{ mb: "10px" }}
            >
              Full Name
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              disabled={!isEditMode}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                  backgroundColor: "#F3ECE5",
                  "& fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />
          </Box>

          <Box sx={{ mb: { xs: "10px", md: "19px" } }}>
            <Typography
              variant="body1"
              gutterBottom
              fontSize={{ xs: "18px", md: "20px" }}
              sx={{ mb: "10px" }}
            >
              First Phone No
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              disabled={!isEditMode}
              value={firstPhone}
              error={firstPhoneError}
              helperText={firstPhoneError ? "Only numbers are allowed" : ""}
              onChange={(e: ChangeEvent) => {
                const value = (e.target as HTMLInputElement).value;
                setFirstPhone(value);
                setFirstPhoneError(!validatePhoneNumber(value));
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                  backgroundColor: "#F3ECE5",
                  "& fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />
          </Box>

          <Box sx={{ mb: { xs: "10px", md: "19px" } }}>
            <Typography
              variant="body1"
              gutterBottom
              fontSize={{ xs: "18px", md: "20px" }}
              sx={{ mb: "10px" }}
            >
              Second Phone No (Optional)
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              onChange={(e: ChangeEvent) => {
                const value = (e.target as HTMLInputElement).value;
                setSecondPhone(value);
                setSecondPhoneError(!validatePhoneNumber(value));
              }}
              disabled={!isEditMode}
              value={secondPhone}
              error={secondPhoneError}
              helperText={secondPhoneError ? "Only numbers are allowed" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                  backgroundColor: "#F3ECE5",
                  "& fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />
          </Box>

          <Box sx={{ mb: { xs: "10px", md: "19px" } }}>
            <Typography
              variant="body1"
              gutterBottom
              fontSize={{ xs: "18px", md: "20px" }}
              sx={{ mb: "10px" }}
            >
              E-Mail
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              disabled={true}
              value={email}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                  backgroundColor: "#F3ECE5",
                  "& fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: { xs: "100%", md: "256px" },
                height: "54px",
                borderRadius: "50px",
                mt: "27px",
                mb: "32px",
                fontSize: { xs: "16px", md: "16px" },
              }}
              onClick={handleOnEdit}
              disabled={isEditMode && !isFormValid}
            >
              {isEditMode ? "Save Changes" : "Edit User Info"}
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          xl={3}
          margin={{ xl: "0 20px 0 0", xs: "20px" }}
          sx={{
            backgroundColor: theme.palette.secondary.main,
            borderRadius: "25px",
            padding: { xs: "20px", md: "25px" },
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: { xs: "20px", md: "30px" },
              mt: "32px",
              fontSize: { xs: "24px", md: "28px" },
            }}
          >
            Orders
          </Typography>
          <Box
            sx={{
              width: "100%",
              padding: "32px",
              backgroundColor: "#F3ECE5",
              borderRadius: "10px",
            }}
          >
            {orders.length
              ? orders.map((order, index) => (
                  <Typography
                    variant="body1"
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: index === 0 ? "4px" : "10px",
                      fontSize: { xs: "18px", md: "20px" },
                      backgroundColor: "transparent",
                      borderRadius: "5px",
                      padding: "0px 5px",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.main,
                      },
                    }}
                    onClick={() => handleOpen(order)}
                  >
                    <span>{handleGetRestaurantName(order._id)}</span>
                    <span>EGP {handleTotalPrice(order._id)}</span>
                  </Typography>
                ))
              : "No orders !"}
          </Box>
        </Grid>
        <OrderDetailsPopup
          open={open}
          handleClose={handleClose}
          order={order}
          items={items.filter((item) => item.orderId === order?._id)}
        />
      </Grid>
    </>
  );
};

export default UserInfoAndOrders;
