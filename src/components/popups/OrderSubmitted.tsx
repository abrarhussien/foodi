import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function OrderSubmitted({setSubmitOrderPopUp}:{setSubmitOrderPopUp:React.Dispatch<React.SetStateAction<boolean>>}) {
  const navigate=useNavigate()
  return (
    <>
    <Box sx={{position: "absolute",left:"0",top:"0",width:"100%",height:"100%",backgroundColor:"#00000060",zIndex:"100"}}>
    <Box
        sx={{
          position: "absolute",
          backgroundColor: "#F3ECE5",
          height: "224px",
          width: "368px",
          left: "50%",
          top: "50vh",
          translate: "-50% -50%",
          zIndex: "200",
          borderRadius: "25px",
        }}
      >
        <Box sx={{position:"absolute",left:"13px",top:"8px","&:hover": { cursor: "pointer" }}} onClick={()=>{setSubmitOrderPopUp(false); navigate("/")}}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.46387 15.535L15.5359 8.46503M8.46387 8.46503L15.5359 15.535"
              stroke="#E4002B"
              strokeOpacity="0.38"
              strokeWidth="1.875"
              strokeLinecap="round"
            />
          </svg>
        </Box>
        <Stack alignItems={"center"} justifyContent={"center"} sx={{gap:"16px",height:"100%"}}>
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "20px",
              lineHeight: "150%",
              textTransform: "capitalize",
              color: "#D74339",
            }}
          >
            {" "}
            order Submitted successfully
          </Typography>
          <Typography sx={{
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "24px",
              textTransform: "capitalize",
              width:"230px"
            }}>
            Your order will be prepared in approximately 30-45 minutes.
          </Typography>
        </Stack>
      </Box>

    </Box>

    </>
  );
}

export default OrderSubmitted;
