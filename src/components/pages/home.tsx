import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  alpha,
  styled,
  InputBase,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../../styles/home.css";
import img from "../../assets/images/11.png";
import img2 from "../../assets/images/12.png";
import Card from "../Whyus";
import Loading from "../shared/Loading";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Search = styled("div")(({ theme }) => ({
  paddingLeft: "20px",
  position: "relative",
  borderRadius: "25px",
  border: "1px solid #d74339",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 0,
  top: "50%",
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "gray",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "45ch",
    },
  },
}));

export default function Home({
  whyUsRef,
}: {
  whyUsRef: React.MutableRefObject<undefined>;
}) {
  const axiosPrivate = useAxiosPrivate();
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();
  const [searchRest, setSearchRest] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasResults, setHasResults] = useState(true);

  useEffect(() => {
    getAllRestaurants();
  }, [searchRest]);

  const getAllRestaurants = async () => {
    try {
      setLoading(true);
      const Rest_URL = searchRest
        ? `/api/v1/restaurant/search/${searchRest}`
        : "/api/v1/restaurant/";
      const { data } = await axiosPrivate.get(Rest_URL);
      setLoading(false);
      setRestaurants(data);
      setHasResults(data.length > 0);
    } catch (err: any) {
      setLoading(false);
    }
  };

  const handleSearchChange = (event: any) => {
    setSearchRest(event.target.value);
  };

  const handleSearchSubmit = () => {
    navigate(`/restaurants?search=${searchRest}`);
  };

  const location = useLocation();

  const scrollToWhyUs = () => {
    const { current } = whyUsRef;
    if (current !== null) {
      //@ts-ignore
      current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (location?.state?.section) {
      scrollToWhyUs();
    }
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div>
        <Stack
          height={"400px"}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ minHeight: "500px", background: "#F9F1E5" }}
        >
          <Box
            sx={{
              backgroundImage: `url(${img})`,
              width: "300px",
              height: "300px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundSize: "cover",
              border: "5px",
              borderRadius: "20%",
              position: "relative",
              bottom: "30px",
              visibility: { xs: "hidden", sm: "visible" },
            }}
          ></Box>
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={10}
            position={"relative"}
            top={"-40px"}
          >
            <Typography
              noWrap
              sx={{
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "black",
                textAlign: "center",
                position: "initial",
                fontSize: { xs: "3.5vw", sm: "24px" },
              }}
            >
              Order food online in Zagazig
            </Typography>

            <Search>
              <StyledInputBase
                placeholder="Search…"
                value={searchRest}
                onChange={handleSearchChange}
                onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                inputProps={{ "aria-label": "Search" }}
              />
              <SearchIconWrapper>
                <SearchIcon onClick={handleSearchSubmit} />
              </SearchIconWrapper>
            </Search>
          </Stack>

          <Box
            sx={{
              backgroundImage: `url(${img2})`,
              width: "300px",
              height: "300px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundSize: "cover",
              border: "5px",
              borderRadius: "5%",
              visibility: { xs: "hidden", sm: "visible" },
            }}
          ></Box>
        </Stack>

        <Box
          sx={{
            minHeight: "400px",
            backgroundColor: "#f3ece4",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
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
              marginTop: "90px",
            }}
          >
            Restaurants
          </Typography>
          {hasResults ? (
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{
                marginBlock: "40px",
                background: "#f3ece4",
              }}
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                  background: "f3ece4",
                  minHeight: "400px",
                  flexWrap: "wrap",
                  spacing: 4,
                }}
              >
                {restaurants.length
                  ? restaurants.slice(0, 4).map((restaurant: any) => (
                      <div
                        onClick={() => navigate("/menu/" + restaurant._id)}
                        key={restaurant._id}
                        className="flip-card"
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <div className="flip-card-inner">
                          <div className="flip-card-front">
                            <img src={restaurant.icon} alt={restaurant.name} />
                          </div>
                          <div className="flip-card-back">
                            <Typography
                              variant="h5"
                              fontWeight={"bold"}
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                textWrap: "nowrap",
                              }}
                            >
                              {restaurant.name}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    ))
                  : ""}
              </Stack>
              <Link to="/restaurants" id="sign-link" className="log3">
                <button className="bb">
                  <h3>See More</h3>
                </button>
              </Link>
            </Stack>
          ) : (
            <Typography
              variant="body1"
              sx={{
                marginTop: "20px",
                fontWeight: "700",
                fontSize: "40px",
                color: "#d74339",
              }}
            >
              No restaurants found.
            </Typography>
          )}
        </Box>
        <Box sx={{ marginTop: { xs: "90px" } }} ref={whyUsRef}>
          <Card />
        </Box>
      </div>
    </>
  );
}
