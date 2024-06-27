import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import successImage from "../../assets/images/payment.png";
import CartContext from "../../context/CartProvider";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const AnimatedBox = styled(Box)({
  animation: `${fadeIn} 1s ease-in-out`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const AnimatedTypography = styled(Typography)({
  animation: `${fadeIn} 1.5s ease-in-out`,
  textAlign: "center",
});

const AnimatedButton = styled(Button)({
  animation: `${slideUp} 2s ease-in-out`,
});

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { emptyCart}: any = useContext(CartContext);


  useEffect(()=>{
    emptyCart()

  },[])

  const handleHomeNavigation = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3ece4",
        padding: "20px",
      }}
    >
      <AnimatedBox
        sx={{
          marginBottom: "20px",
        }}
      >
        <Box
          component="img"
          src={successImage}
          alt="Payment Success"
          sx={{
            width: { xs: "80%", sm: "60%", md: "40%" },
            borderRadius: "8px",
          }}
        />
      </AnimatedBox>
      <AnimatedTypography variant="h4" sx={{ marginBottom: "20px" }}>
        Payment Successful! ✔
      </AnimatedTypography>
      <AnimatedTypography variant="h6" sx={{ marginBottom: "40px" }}>
        Thank you for your purchase. 😊
      </AnimatedTypography>
      <AnimatedButton
        variant="contained"
        color="primary"
        onClick={handleHomeNavigation}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Go to Home"
        )}
      </AnimatedButton>
    </Box>
  );
}
