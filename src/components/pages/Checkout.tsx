import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import OrderSubmitted from "../popups/OrderSubmitted";
import AddNumber from "../popups/AddNumber";
import AddAdress from "../popups/AddAdress";
import axios from "axios";
import CartContext from "../../context/CartProvider";
import socket from "../../utils/socket";
import { IPhone } from "../../models/phone.model";
import { IAddress } from "../../models/address.model";
const url = "https://back-end-j1bi.onrender.com/api/v1";

function Checkout({}) {
  const [phones, setPhones] = useState<IPhone[]>([]);
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const addPhoneNumber = (phone: any) => {
    const newPhones = [...phones, phone];
    setPhones(newPhones);
  };
  const addAddress = (address: any) => {
    const newAddresses = [...addresses, address];
    setAddresses(newAddresses);
  };

  const { emptyCart, cartTotal, restaurantId }: any = useContext(CartContext);
  const [submitOrderPopUp, setSubmitOrderPopUp] = useState(false);
  const [addNumberPopUp, setAddNumberPopUp] = useState(false);
  const [addAddressPopUp, setAddAddressPopUp] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [error, setError] = useState("");

  const [checkoutInfo, setCheckoutInfo] = useState<{
    phone: string;
    address: string;
  }>({
    phone: "",
    address: "",
  });

  const vat: number = 10;

  const handleInfoChange = (newCheckOutInfo: {
    address: string;
    phone: string;
  }) => {
    setCheckoutInfo(newCheckOutInfo);
  };
  useEffect(() => {
    const getUserAddresses = async () => {
      const res = await axios.get(url + "/addresses", {
        headers: { jwt: localStorage.getItem("token") },
      });
      if (!res.data.message) {
        const newAddresses = res.data;
        setAddresses(newAddresses);
      }
    };
    const getUserPhones = async () => {
      const res = await axios.get(url + "/phones", {
        headers: { jwt: localStorage.getItem("token") },
      });
      if (!res.data.message) {
        const newPhones = res.data;
        setPhones(newPhones);
      }
    };

    getUserAddresses();
    getUserPhones();

    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.on("new-order-res", (data) => {
      console.log(data);
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  useEffect(() => {
    if (phones.length) {
      setCheckoutInfo((pre) => {
        return {
          phone: phones[phones.length - 1]._id,
          address: pre.address,
        };
      });
    }
  }, [phones]);
  useEffect(() => {
    if (addresses.length) {
      setCheckoutInfo((pre) => {
        return {
          phone: pre.phone,
          address: addresses[addresses.length - 1]._id,
        };
      });
    }
  }, [addresses]);

  const handlCheckout = () => {
    const fetchCheckout = async () => {
      try {
        const res = await axios.post(
          url + "/orders/" + restaurantId + "/user",
          { phoneId: checkoutInfo.phone, addressId: checkoutInfo.address },
          {
            headers: { jwt: localStorage.getItem("token") },
          }
        );

        socket.emit("new-order-req", restaurantId);

        if (res.status == 201) {
          emptyCart();
          setSubmitOrderPopUp(true);
        }
      } catch (error: any) {
        setError(error.message);
      }
    };
    const fetchStripe = async () => {
      const res = await axios.post(
        url + "/payments",
        { phoneId: checkoutInfo.phone, addressId: checkoutInfo.address },
        {
          headers: { jwt: localStorage.getItem("token") },
        }
      );
      window.location.replace(res.data.session.url);

      // socket.emit("new-order-req", restaurantId);

      // if (res.status == 201) {
      //   emptyCart();
      //   setSubmitOrderPopUp(true);
      // }
    };
    if (!checkoutInfo.phone) {
      setPhoneError(true);
    }
    if (!checkoutInfo.address) {
      setAddressError(true);
    }
    if (!paymentMethod) {
      setPaymentError(true);
    }
    if (checkoutInfo.phone && checkoutInfo.address && paymentMethod) {
      setAddressError(false);
      setPhoneError(false);
      setError("");
      paymentMethod == "cash" ? fetchCheckout() : fetchStripe();
    }
  };

  const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
        borderRadius: "15px",
        border: "1px solid #d84339",
      },
    },
  };
  return (
    <>
      <Container maxWidth="xl">
        {submitOrderPopUp && (
          <OrderSubmitted
            setSubmitOrderPopUp={setSubmitOrderPopUp}
          ></OrderSubmitted>
        )}
        {addNumberPopUp && (
          <AddNumber
            addPhoneNumber={addPhoneNumber}
            setAddNumberPopUp={setAddNumberPopUp}
            setCheckoutInfo={setCheckoutInfo}
          ></AddNumber>
        )}
        {addAddressPopUp && (
          <AddAdress
            addAddress={addAddress}
            setAddAddressPopUp={setAddAddressPopUp}
            setCheckoutInfo={setCheckoutInfo}
          ></AddAdress>
        )}

        <Grid
          container
          justifyContent={"space-between"}
          sx={{
            paddingBottom: "60px",
            alignItems: { xs: "center", lg: "start" },
          }}
        >
          <Grid
            item
            xs={12}
            lg={7}
            sx={{
              backgroundColor: "#E8DCCC",
              paddingInline: { xs: "1rem", sm: "2rem", md: "4rem" },
              paddingBlock: "1.5rem 2.5rem",
              borderRadius: "10px",
              marginTop: "3rem",
            }}
          >
            <Stack alignItems={"center"}>
              <Typography
                sx={{
                  fontSize: "28px",
                  fontWeight: "700",
                  textTransform: "capitalize",
                  marginBottom: "24px",
                }}
              >
                contact info
              </Typography>
              <FormControl fullWidth>
                <Box sx={{ marginInline: "auto", width: "100%" }}>
                  <Typography sx={{ color: "#111111BA", fontSize: "18px" }}>
                    Phone Number
                  </Typography>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"start"}
                    spacing={2}
                    sx={{ paddingInline: "0px", position: "relative" }}
                  >
                    <Select
                      error={phoneError}
                      MenuProps={MenuProps}
                      sx={{
                        width: { xs: "92%" },
                        border: "1px solid #d84339",
                        backgroundColor: "#F3ECE5",
                        borderRadius: "15px",
                        height: "50px",
                      }}
                      id="demo-simple-select"
                      value={checkoutInfo.phone}
                      onChange={(e) =>
                        handleInfoChange({
                          ...checkoutInfo,
                          phone: e.target.value,
                        })
                      }
                    >
                      {phones.length ? (
                        phones.map((phone) => (
                          <MenuItem key={phone.phoneNumber} value={phone._id}>
                            {phone.phoneNumber}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem>No Phone To Show</MenuItem>
                      )}
                    </Select>
                    <Box
                      onClick={() => {
                        setAddNumberPopUp(true);
                      }}
                      sx={{
                        "&:hover": { cursor: "pointer" },
                        position: "absolute",
                        right: "0px",
                      }}
                    >
                      <svg
                        width="24"
                        height="30"
                        viewBox="0 0 24 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 16.5259V23.8704H11V16.5259H5L5 14.0778H11L11 6.73336H13L13 14.0778L19 14.0778V16.5259H13Z"
                          fill="#111111"
                        />
                      </svg>
                    </Box>
                  </Stack>
                </Box>
              </FormControl>
              {phoneError && (
                <Typography sx={{ color: "red", alignSelf: "start" }}>
                  select an Number!
                </Typography>
              )}
              <FormControl fullWidth sx={{ marginTop: "8px" }}>
                <Box sx={{ marginInline: "auto", width: "100%" }}>
                  <Typography sx={{ color: "#111111BA", fontSize: "18px" }}>
                    Address
                  </Typography>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"start"}
                    spacing={2}
                    sx={{ paddingInline: "0px", position: "relative" }}
                  >
                    <Select
                      error={addressError}
                      MenuProps={MenuProps}
                      sx={{
                        width: { xs: "92%" },
                        border: "1px solid #d84339",
                        backgroundColor: "#F3ECE5",
                        borderRadius: "15px",
                        height: "96px",
                        wordWrap: "break-word",
                        "& MuiSelect-select": { wordWrap: "break-word" },
                      }}
                      id="demo-simple-select"
                      value={checkoutInfo.address}
                      //   label="Age"
                      onChange={(e) =>
                        handleInfoChange({
                          ...checkoutInfo,
                          address: e.target.value,
                        })
                      }
                    >
                      {addresses.map((addresse) => (
                        <MenuItem key={addresse._id} value={addresse._id}>
                          {addresse.details}
                        </MenuItem>
                      ))}
                    </Select>
                    <Box
                      onClick={() => {
                        setAddAddressPopUp(true);
                      }}
                      sx={{
                        "&:hover": { cursor: "pointer" },
                        position: "absolute",
                        right: "0px",
                      }}
                    >
                      <svg
                        width="24"
                        height="30"
                        viewBox="0 0 24 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 16.5259V23.8704H11V16.5259H5L5 14.0778H11L11 6.73336H13L13 14.0778L19 14.0778V16.5259H13Z"
                          fill="#111111"
                        />
                      </svg>
                    </Box>
                  </Stack>
                </Box>
              </FormControl>
              {addressError && (
                <Typography sx={{ color: "red", alignSelf: "start" }}>
                  select an Address!
                </Typography>
              )}
              <FormControl fullWidth sx={{ marginTop: "8px" }}>
                <Box sx={{ marginInline: "auto", width: "100%" }}>
                  <Typography sx={{ color: "#111111BA", fontSize: "18px" }}>
                    Payment method
                  </Typography>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"start"}
                    spacing={2}
                    sx={{ paddingInline: "0px", position: "relative" }}
                  >
                    <RadioGroup
                      name="payment-method"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <FormControlLabel
                        value="cash"
                        control={<Radio />}
                        label="cash"
                      />
                      <FormControlLabel
                        value="stripe"
                        control={<Radio />}
                        label="stripe"
                      />
                    </RadioGroup>
                  </Stack>
                </Box>
              </FormControl>
              {paymentError && (
                <Typography sx={{ color: "red", alignSelf: "start" }}>
                  select a payment method!
                </Typography>
              )}
              {error && (
                <Typography sx={{ color: "red", alignSelf: "start" }}>
                  {error}
                </Typography>
              )}
            </Stack>
          </Grid>
          {
            <Grid
              item
              xs={12}
              md={12}
              lg={4}
              sx={{
                marginTop: "3rem",
              }}
            >
              <Grid container justifyContent={"space-between"}>
                <Grid item xs={12} md={7} lg={12}>
                  <Box
                    sx={{
                      backgroundColor: "#E8DCCC",
                      paddingBlock: "32px",
                      borderRadius: "10px",
                      height: "243px",
                    }}
                  >
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      sx={{
                        paddingInline: { xs: "1.5rem", sm: "3rem", md: "1rem" },
                      }}
                    >
                      <Stack>
                        <Typography
                          sx={{
                            color: "#00000069",
                            fontSize: { xs: "18px", sm: "20px" },
                          }}
                        >
                          Sub Total:
                        </Typography>
                        <Typography
                          sx={{
                            color: "#00000069",
                            fontSize: { xs: "18px", sm: "20px" },
                          }}
                        >
                          vat:
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography
                          sx={{
                            color: "#00000069",
                            fontSize: { xs: "18px", sm: "20px" },
                          }}
                        >
                          EGP {cartTotal}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#00000069",
                            fontSize: { xs: "18px", sm: "20px" },
                          }}
                        >
                          EGP {vat}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Divider color={"black"} sx={{ marginBlock: "18px" }} />
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      sx={{
                        paddingInline: { xs: "1.5rem", sm: "3rem", md: "1rem" },
                      }}
                    >
                      <Stack>
                        <Typography
                          sx={{ fontSize: { xs: "24px", sm: "28px" } }}
                        >
                          Total
                        </Typography>
                        <Typography
                          sx={{
                            color: "#00000069",
                            marginTop: "14px",
                            fontSize: { xs: "18px", sm: "20px" },
                          }}
                        >
                          Including vat
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography
                          sx={{ fontSize: { xs: "20px", sm: "24px" } }}
                        >
                          EGP {cartTotal + vat}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4} lg={12}>
                  <Button
                    variant="outlined"
                    sx={{
                      width: "100%",
                      borderRadius: "50px",
                      marginBlock: "32px",
                      color: "black",
                      height: { xs: "54px", sm: "64px" },
                      fontSize: { xs: "18px", sm: "24px" },
                      fontWeight: "700",
                    }}
                  >
                    Add more items
                  </Button>
                  <Button
                    sx={{
                      width: "100%",
                      borderRadius: "50px",
                      height: { xs: "54px", sm: "64px" },
                      fontSize: { xs: "18px", sm: "24px" },
                      fontWeight: "700",
                    }}
                    variant="contained"
                    color="primary"
                    onClick={handlCheckout}
                  >
                    checkout
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          }
        </Grid>
      </Container>
    </>
  );
}

export default Checkout;
