import { Box, Button, TextField, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const phoneRegex = new RegExp(/^01[0-2,5]{1}[0-9]{8}$/);
const url = "https://back-end-j1bi.onrender.com/api/v1";

function AddNumber({
  setAddNumberPopUp,
  addPhoneNumber,
  setCheckoutInfo,
}: {
  setAddNumberPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  addPhoneNumber: (phone: string) => void;
  setCheckoutInfo: React.Dispatch<
    React.SetStateAction<{
      phone: any;
      address: any;
    }>
  >;
}) {
  const axiosPrivate = useAxiosPrivate();

  let [phone, setPhone] = useState("");
  let [error, setError] = useState(false);

  const handlePhoneInput = (e: any) => {
    setPhone(e.target.value);
  };
  const handleAddPhone = () => {
    const fetchAddPhone = async () => {
      const res = await axiosPrivate.post(
        url + "/phones",
        {
          phoneNumber: phone,
        }
      );
      addPhoneNumber(res.data);
      setCheckoutInfo((pre: any) => {
        return { phone: res.data._id, address: pre.address };
      });
    };
    if (!phoneRegex.test(phone)) {
      setError(true);
    } else {
      setError(false);
      fetchAddPhone();
      setAddNumberPopUp(false);
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
            minHeight: "140px",
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
              setAddNumberPopUp(false);
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
              phone number
            </Typography>
            <TextField
              error={error}
              helperText={error ? "Incorrect phone number" : ""}
              onInput={handlePhoneInput}
              value={phone}
              sx={{
                "& input": {
                  height: "24px",
                  width: "256px",
                  padding: "0 5px",
                  border: "0.5px solid #d84339",
                  borderRadius: "5px",
                },
              }}
              id="outlined-basic"
              variant="outlined"
            />
            <Button
              onClick={handleAddPhone}
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

export default AddNumber;
