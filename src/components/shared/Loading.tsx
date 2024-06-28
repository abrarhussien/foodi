import { Box, Stack } from "@mui/material";
import "animate.css";
import logo from "../../../public/main logo.svg";

export default function Loading() {
  return (
    <Stack
      position={"fixed"}
      width={"100vw"}
      height={"100vh"}
      top={0}
      left={0}
      zIndex={5}
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box>
        <img className=" loading" src={logo} />
      </Box>
    </Stack>
  );
}
