import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import img1 from "../assets/images/1.png";
import img2 from "../assets/images/2.png";
import img3 from "../assets/images/3.png";

export default function Card() {
  return (
    <div>
      <Box
        sx={{
          minHeight: "400px",
          backgroundColor: "#f3ece4",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "20px",
          marginBottom:"60px"
        }}
      >
        <Typography
          variant="h5"
          noWrap
          sx={{
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "black",
            textAlign: "center",
            marginBottom: "70px",
          }}
        >
          Why Us
        </Typography>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "400px", background: "#f3ece4" }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="center"
            alignItems="center"
            sx={{ marginBlock:"10px",background: "#f3ece4", flexWrap: "wrap",gap:{xs: 3,sm:7 ,md: 10} }}
          >
            <Stack
              justifyContent="center"
              alignItems="center"
              spacing={1}
              sx={{
                flexWrap: "wrap",
                textAlign: "center",
                width: { xs: "100%", sm: "250px" },
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${img1})`,
                  width: { xs: "200px", sm: "250px" },
                  height: { xs: "200px", sm: "250px" },
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                  borderRadius: "50%",
                }}
              ></Box>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  fontWeight: 700,
                  color: "black",
                  marginTop: "20px",
                }}
              >
                Wide Selection
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "black",
                }}
              >
                Explore a diverse range <br />
                of cuisines and dishes <br />
                to satisfy any craving.
              </Typography>
            </Stack>
            <Stack
              justifyContent="center"
              alignItems="center"
              spacing={1}
              sx={{
                flexWrap: "wrap",
                textAlign: "center",
                width: { xs: "100%", sm: "250px" },
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${img2})`,
                  width: { xs: "200px", sm: "250px" },
                  height: { xs: "200px", sm: "250px" },
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                  borderRadius: "50%",
                }}
              ></Box>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  fontWeight: 700,
                  color: "black",
                  marginTop: "20px",
                }}
              >
                Fresh ingredients
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "black",
                }}
              >
                Experience the vibrant taste fresh ingredients in every bite.
              </Typography>
            </Stack>
            <Stack
              justifyContent="center"
              alignItems="center"
              spacing={1}
              sx={{
                flexWrap: "wrap",
                textAlign: "center",
                width: { xs: "100%", sm: "250px" },
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${img3})`,
                  width: { xs: "200px", sm: "250px" },
                  height: { xs: "200px", sm: "250px" },
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                  borderRadius: "50%",
                }}
              ></Box>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  fontWeight: 700,
                  color: "black",
                  marginTop: "20px",
                }}
              >
                Exceptional Service
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "black",
                }}
              >
                Our dedicated team is <br />
                committed to providing <br />
                excellent service.
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}
