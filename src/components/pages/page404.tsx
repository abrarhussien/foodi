import { Box, Button, Typography } from "@mui/material";
import character1 from "../../../public/character-1.svg";
import character2 from "../../../public/character-2.svg";
import character3 from "../../../public/character-3.svg";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: "20px",
          fontWeight: "700",
          fontSize: "60px",
          marginTop: "70px",
        }}
      >
        Sorry, Page not found!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => (window.location.href = "/")}
        sx={{
          width: "280px",
          backgroundColor: "#d84339",
          fontSize: "24px",
          borderRadius: "50px",
          marginBottom: "100px",
        }}
      >
        Go to Homepage
      </Button>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "600px",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={character1}
            alt=""
            sx={{ height: "100%", objectFit: "contain" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "600px",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={character2}
            alt=""
            sx={{ height: "100%", objectFit: "contain" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "600px",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={character3}
            alt=""
            sx={{ height: "100%", objectFit: "contain" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
