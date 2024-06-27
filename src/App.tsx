import { CssBaseline, ThemeProvider, Stack } from "@mui/material";
import theme from "./themes/theme.ts";
import NavBar from "./components/shared/NavBar.tsx";
import Footer from "./components/shared/Footer.tsx";
import Cart from "./components/pages/Cart.tsx";
import Checkout from "./components/pages/Checkout.tsx";
import CartIcon from "./components/shared/CartIcon.tsx";
import SideCart from "./components/shared/SideCart.tsx";
import { useContext, useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import item from "./models/Item.ts";
import Home from "./components/pages/home";
import Restaurants from "./components/pages/restaurants";
import Register from "./components/pages/register";
import Login from "./components/pages/login";
import { Menu } from "./components/pages/Menu.tsx";
import Ditails from "./components/pages/Ditails.tsx";
import UserInfoAndOrders from "./components/pages/UserInfoAndOrders.tsx";
import axios from "axios";
import CartContext from "./context/CartProvider.tsx";
import IsNotAuthGuard from "./guards/IsNotAuthGuard.tsx";
import IsAuthGuard from "./guards/IsAuthGuard.tsx";
import { jwtDecode } from "jwt-decode";
import { IPayload } from "./models/payload.mode.ts";
const url = "https://back-end-j1bi.onrender.com/api/v1";
import PaymentSuccess from "./components/pages/payment_success.tsx";

function App() {
  const path = useLocation().pathname;
  const [openSideCart, setOpenSideCart] = useState(false);

  const [isUser, setisUser] = useState(false);

  const {
    cartItems,
    setCartItems,
    cartQuantity,
    setCartQuantity,
    cartTotal,
    setCartTotal,
    emptyCart,
    deleteItemQuantity,
    editItemQuantity,
    calculateTotal,
    calculateQuantity,
    restaurantId,
    setRestaurantId,
  }: any = useContext(CartContext);

  const whyUsRef = useRef();

  useEffect(() => {
    const getUserCart = async () => {
      const res = await axios.get(url + "/cart", {
        headers: { jwt: localStorage.getItem("token") },
      });
      if (res.data.itemsIds?.length) {
        const newCartItems = res.data.itemsIds;
        setCartItems(newCartItems);
        setRestaurantId(res.data.itemsIds[0].productId.restaurantId);
        calculateQuantity(newCartItems);
        calculateTotal(newCartItems);
      }
    };


    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const payload: IPayload | null = token ? jwtDecode(token) : null;
      //@ts-ignore
      const expDate = payload?.exp * 1000;
      const nowDate = new Date().getTime();

      if (expDate > nowDate) {
        setisUser(true);
        getUserCart();
      } else {
        localStorage.removeItem("token");
      }
    } else {
      setisUser(false);
      setCartItems([]);
      setRestaurantId("");
      setCartQuantity(0);
      setCartTotal(0);
    }
  }, [isUser]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Stack
          justifyContent={"space-between"}
          sx={{
            minHeight: "100vh",
            backgroundColor: "#F3ECE4",
            position: "relative",
          }}
        >
          {path !== "/register" && path !== "/login" && (
            <NavBar
              isUser={isUser}
              setisUser={setisUser}
              whyUsRef={whyUsRef}
            ></NavBar>
          )}
          <Routes>
            <Route path="/menu" element={<Menu />} />

            <Route path="/productdetails" element={<Ditails />} />
            <Route element={<IsNotAuthGuard />}>
              <Route
                path="/register"
                element={<Register setisUser={setisUser} />}
              />
              <Route path="/login" element={<Login setisUser={setisUser} />} />
            </Route>
            <Route element={<IsAuthGuard role={"user"} />}>
              <Route path="/userinfo" element={<UserInfoAndOrders />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/paymentSuccess" element={<PaymentSuccess />} />
              <Route path="/cart" element={<Cart />} />
            </Route>

            <Route path="/" element={<Home whyUsRef={whyUsRef} />} />
            <Route path="/restaurants" element={<Restaurants />} />
          </Routes>
          {path !== "/register" && path !== "/login" && <Footer whyUsRef={whyUsRef}/>}
        </Stack>
        {openSideCart && <SideCart setOpenSideCart={setOpenSideCart} />}
        {path !== "/register" && path !== "/login" && path !== "/cart" && isUser && (
          <CartIcon setOpenSideCart={setOpenSideCart} />
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
