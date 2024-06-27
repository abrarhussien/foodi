import { Button, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import CartContext from "../../context/CartProvider";

function CartIcon({
  setOpenSideCart,
}: {
  setOpenSideCart: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //@ts-ignore
  const { cartTotal } = useContext(CartContext);
  return (
    <>
      <Button
        onClick={() => setOpenSideCart(true)}
        variant="contained"
        sx={{
          position: "fixed",
          backgroundColor: "#D74339",
          height: "64px",
          minWidth: "64px",
          right: "43px",
          bottom: "155px",
          borderRadius: "100px",
          gap: "8px",
          padding: "20px 14px",
          "& :hover": {
            cursor: "pointer",
          },
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.86428 16.455C3.00628 13.023 2.57728 11.308 3.47828 10.154C4.37828 9 6.14828 9 9.68528 9H14.3153C17.8533 9 19.6213 9 20.5223 10.154C21.4233 11.307 20.9943 13.024 20.1363 16.455C19.5903 18.638 19.3183 19.729 18.5043 20.365C17.6903 21 16.5653 21 14.3153 21H9.68528C7.43528 21 6.31028 21 5.49628 20.365C4.68228 19.729 4.40928 18.638 3.86428 16.455Z"
            stroke="white"
            strokeWidth="1.875"
          />
          <path
            d="M19.5 9.5L18.79 6.895C18.516 5.89 18.379 5.388 18.098 5.009C17.8178 4.63246 17.4373 4.3424 17 4.172C16.56 4 16.04 4 15 4M4.5 9.5L5.21 6.895C5.484 5.89 5.621 5.388 5.902 5.009C6.18218 4.63246 6.56269 4.3424 7 4.172C7.44 4 7.96 4 9 4"
            stroke="white"
            strokeWidth="1.875"
          />
          <path
            d="M9 4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4C15 4.26522 14.8946 4.51957 14.7071 4.70711C14.5196 4.89464 14.2652 5 14 5H10C9.73478 5 9.48043 4.89464 9.29289 4.70711C9.10536 4.51957 9 4.26522 9 4Z"
            stroke="white"
            strokeWidth="1.875"
          />
        </svg>
        {cartTotal > 0 && (
          <Typography sx={{ color: "white", fontSize: "16px" }}>
            {cartTotal} EGP
          </Typography>
        )}
      </Button>
    </>
  );
}

export default CartIcon;
