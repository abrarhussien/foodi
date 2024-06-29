import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import React, { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const url = "https://back-end-j1bi.onrender.com/api/v1";

function AddAdress({
  setAddAddressPopUp,
  addAddress,
  setCheckoutInfo,
}: {
  setAddAddressPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  addAddress: (address: string) => void;
  setCheckoutInfo: React.Dispatch<
    React.SetStateAction<{
      phone: any;
      address: any;
    }>
  >;
}) {
  const axiosPrivate = useAxiosPrivate();

  let [address, setAddress] = useState("");
  let [error, setError] = useState(false);

  const handleAddressInput = (e: any) => {
    setAddress(e.target.value);
  };
  const handleAddAddress = () => {
    const fetchAddAddress = async () => {
      const res = await axiosPrivate.post(url + "/addresses", {
        details: address,
      });
      addAddress(res.data);
      setCheckoutInfo((pre: any) => {
        return { phone: pre.phone, address: res.data._id };
      });
    };
    if (address.length < 50) {
      setError(true);
    } else {
      setError(false);
      fetchAddAddress();
      setAddAddressPopUp(false);
    }
  };
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "#00000060",
          zIndex: "100",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "#F3ECE5",
            minHeight: "180px",
            width: "320px",
            left: "50%",
            top: "50vh",
            translate: "-50% -50%",
            zIndex: "200",
            borderRadius: "10px",
            paddingBottom: "15px",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: "8px",
              top: "8px",
              "&:hover": { cursor: "pointer" },
            }}
            onClick={() => {
              setAddAddressPopUp(false);
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
                d="M8.46387 15.535L15.5359 8.46503M8.46387 8.46503L15.5359 15.535"
                stroke="#E4002B"
                strokeOpacity="0.38"
                strokeWidth="1.875"
                strokeLinecap="round"
              />
            </svg>
          </Box>
          <Stack
            alignItems={"center"}
            sx={{
              gap: "16px",
              height: "100%",
              paddingInline: "32px",
              paddingTop: "24px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: "14px",
                textTransform: "capitalize",
                color: "#111111BA",
              }}
              alignSelf={"start"}
            >
              {" "}
              Address
            </Typography>

            <TextField
              error={error}
              onInput={handleAddressInput}
              value={address}
              helperText={error ? "address length must be 50" : ""}
              multiline
              fullWidth
              rows={2}
              sx={{
                padding: "0",
                border: "0.5px solid #d84339",
                borderRadius: "5px",
              }}
              id="outlined-basic"
              variant="outlined"
              size="small"
            />
            <Button
              onClick={handleAddAddress}
              sx={{
                width: "112px",
                borderRadius: "25px",
                height: "24px",
                fontSize: "16px",
                textTransform: "capitalize",
              }}
              variant="contained"
            >
              Insert
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default AddAdress;
