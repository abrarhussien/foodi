import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import logo from "../../assets/logo.svg";
import { useLocation, useNavigate } from "react-router-dom";

function Footer({ whyUsRef }: { whyUsRef: React.MutableRefObject<undefined> }) {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToWhyUs = () => {
    const { current } = whyUsRef;
    if (current !== null) {
      //@ts-ignore
      current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#373334",
        color: "white",
        minHeight: "356px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: { xs: "40px" },
      }}
    >
      <Grid
        container
        justifyContent={"space-around"}
        alignItems={"center"}
        spacing={8}
      >
        <Grid item xs={12} md={3}>
          <Stack justifyContent={"center"}>
            <Button>
              <img src={logo} width={"144px"} height={"144px"} alt="Logo" />
            </Button>
            <Typography sx={{ fontWeight: "400", fontSize: "20px" }}>
              Craving deliciousness? Order from your favorite restaurants now!
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={2}>
          <Stack justifyContent={"center"} spacing={2}>
            <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
              Quick links
            </Typography>

            <Typography
              sx={{
                fontWeight: "400",
                fontSize: "16px",
                "&:hover": { cursor: "pointer" },
              }}
              onClick={() =>
                location.pathname === "/"
                  ? scrollToWhyUs()
                  : navigate("/", { state: { section: "why us" } })
              }
            >
              why us?
            </Typography>
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: "16px",
                "&:hover": { cursor: "pointer" },
              }}
              onClick={() => navigate("/Restaurants")}
            >
              Restaurants
            </Typography>
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: "16px",
                "&:hover": { cursor: "pointer" },
              }}
              onClick={() => navigate("/")}
            >
              Home
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={3}>
          <Stack justifyContent={"center"} spacing={2}>
            <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
              Find us on social media
            </Typography>
            <Stack direction={"row"}>
              <Button
                onClick={() =>
                  window.location.replace(
                    "https://www.instagram.com/foodi1465/"
                  )
                }
              >
                {/* Instagram Icon */}
                <svg
                  width="32"
                  height="24"
                  viewBox="0 0 32 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.3998 2H21.5998C25.8665 2 29.3332 4.6 29.3332 7.8V16.2C29.3332 17.7383 28.5184 19.2135 27.0681 20.3012C25.6178 21.3889 23.6508 22 21.5998 22H10.3998C6.13317 22 2.6665 19.4 2.6665 16.2V7.8C2.6665 6.26174 3.48126 4.78649 4.93155 3.69878C6.38183 2.61107 8.34883 2 10.3998 2ZM10.1332 4C8.86013 4 7.63923 4.37928 6.73906 5.05442C5.83888 5.72955 5.33317 6.64522 5.33317 7.6V16.4C5.33317 18.39 7.47984 20 10.1332 20H21.8665C23.1395 20 24.3604 19.6207 25.2606 18.9456C26.1608 18.2705 26.6665 17.3548 26.6665 16.4V7.6C26.6665 5.61 24.5198 4 21.8665 4H10.1332ZM22.9998 5.5C23.4419 5.5 23.8658 5.6317 24.1784 5.86612C24.4909 6.10054 24.6665 6.41848 24.6665 6.75C24.6665 7.08152 24.4909 7.39946 24.1784 7.63388C23.8658 7.8683 23.4419 8 22.9998 8C22.5578 8 22.1339 7.8683 21.8213 7.63388C21.5088 7.39946 21.3332 7.08152 21.3332 6.75C21.3332 6.41848 21.5088 6.10054 21.8213 5.86612C22.1339 5.6317 22.5578 5.5 22.9998 5.5ZM15.9998 7C17.7679 7 19.4636 7.52678 20.7139 8.46447C21.9641 9.40215 22.6665 10.6739 22.6665 12C22.6665 13.3261 21.9641 14.5979 20.7139 15.5355C19.4636 16.4732 17.7679 17 15.9998 17C14.2317 17 12.536 16.4732 11.2858 15.5355C10.0355 14.5979 9.33317 13.3261 9.33317 12C9.33317 10.6739 10.0355 9.40215 11.2858 8.46447C12.536 7.52678 14.2317 7 15.9998 7ZM15.9998 9C14.939 9 13.9216 9.31607 13.1714 9.87868C12.4213 10.4413 11.9998 11.2044 11.9998 12C11.9998 12.7956 12.4213 13.5587 13.1714 14.1213C13.9216 14.6839 14.939 15 15.9998 15C17.0607 15 18.0781 14.6839 18.8283 14.1213C19.5784 13.5587 19.9998 12.7956 19.9998 12C19.9998 11.2044 19.5784 10.4413 18.8283 9.87868C18.0781 9.31607 17.0607 9 15.9998 9Z"
                    fill="#D74339"
                  />
                </svg>
              </Button>
              <Button
                onClick={() =>
                  window.location.replace(
                    "https://www.facebook.com/profile.php?id=100084282463490"
                  )
                }
              >
                {/* Facebook Icon */}
                <svg
                  width="32"
                  height="24"
                  viewBox="0 0 32 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_821_529"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="32"
                    height="24"
                  >
                    <path d="M0 0H32V24H0V0Z" fill="white" />
                  </mask>
                  <g mask="url(#mask0_821_529)">
                    <path
                      d="M25.2 1.12451H30.1074L19.3874 10.3371L32 22.8754H22.1257L14.3863 15.2725L5.54057 22.8754H0.628571L12.0937 13.0182L0 1.12623H10.1257L17.1109 8.07422L25.2 1.12451ZM23.4743 20.6674H26.1943L8.64 3.21765H5.72343L23.4743 20.6674Z"
                      fill="#D74339"
                    />
                  </g>
                </svg>
              </Button>
              <Button
                onClick={() =>
                  window.location.replace("https://x.com/FoodiSocial20")
                }
              >
                {/* Twitter Icon */}
                <svg
                  width="32"
                  height="24"
                  viewBox="0 0 32 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.9998 2.04004C8.6665 2.04004 2.6665 6.53004 2.6665 12.06C2.6665 17.06 7.5465 21.21 13.9198 21.96V14.96H10.5332V12.06H13.9198V9.85004C13.9198 7.34004 15.9065 5.96004 18.9598 5.96004C20.4132 5.96004 21.9332 6.15004 21.9332 6.15004V8.62004H20.2532C18.5998 8.62004 18.0798 9.39004 18.0798 10.18V12.06H21.7865L21.1865 14.96H18.0798V21.96C21.2218 21.5879 24.0828 20.3856 26.1464 18.5701C28.21 16.7546 29.3403 14.4457 29.3332 12.06C29.3332 6.53004 23.3332 2.04004 15.9998 2.04004Z"
                    fill="#D74339"
                  />
                </svg>
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: "center", mt: "70px" }}>
        <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
          © {new Date().getFullYear()} Foodi. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
