import { useState, useEffect, useRef } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "../../styles/restaurant.css";
import img from "../../assets/images/21.png";
import img2 from "../../assets/images/22.png";
import axios from "../../api/axios";
import Section from "../shared/Section";
import { IMenuCategory } from "../../models/menuCategory.model";
import { IRestaurant } from "../../models/restaurant.model";

const itemsInPage = 8;

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [allRestaurants, setAllRestaurants] = useState<IRestaurant[]>([]);
  const [page, setPage] = useState(0);
  const [filteredRestaurants, setFilteredRestaurants] = useState<IRestaurant[]>(
    []
  );
  const [categories, setCategories] = useState<IMenuCategory[]>([]);

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const handleGetCategories = async () => {
    const res = await axios.get("/api/v1/restaurantCategory");
    setCategories(res.data);
  };

  const handleCategoryClick = (categoryId: string) => {
    const filtered = allRestaurants.filter((restaurant) =>
      restaurant.categoriesIds?.includes(categoryId)
    );
    setFilteredRestaurants(filtered);
    setPage(0);
  };

  useEffect(() => {
    getAllRestaurants();
    handleGetCategories();
  }, []);

  useEffect(() => {
    filterRestaurants();
  }, [searchQuery, restaurants]);

  const getAllRestaurants = async () => {
    try {
      const { data } = await axios.get("/api/v1/restaurant/");
      setRestaurants(data);
      setAllRestaurants(data);
    } catch (err: any) {
      console.error(err.response?.data || err.message, "err");
    }
  };

  const filterRestaurants = () => {
    if (searchQuery) {
      const filtered = allRestaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchQuery)
      );
      setFilteredRestaurants(filtered);
    } else {
      setFilteredRestaurants(allRestaurants);
    }
    setPage(0);
  };

  const handleNext = () => {
    setPage((prevPage) =>
      Math.min(
        prevPage + 1,
        Math.ceil(filteredRestaurants.length / itemsInPage) - 1
      )
    );
  };

  const handlePrev = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const startIndex = page * itemsInPage;
  const endIndex = startIndex + itemsInPage;
  const currentItems = filteredRestaurants.slice(startIndex, endIndex);

  return (
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
            width: "250px",
            height: "320px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            borderRadius: "1%",
            visibility:{xs:"hidden",sm:"visible"}

          }}
        ></Box>
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={4}
          position={"relative"}
          top={"-40px"}
        >
          <Typography
            noWrap
            sx={{
              fontWeight: 700,
              color: "black",
              textAlign: "center",
              position: "initial",
              bottom: "10px",
              fontSize:{xs:"3.8vw",sm:"24px"}
            }}
          >
            Order from your favorite restaurants now!
          </Typography>
        </Stack>
        <Box
          sx={{
            backgroundImage: `url(${img2})`,
            width: "200px",
            height: "300px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            position: "relative",
            bottom: "20px",
            visibility:{xs:"hidden",sm:"visible"}
          }}
        ></Box>
      </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "800px", background: "#f3ece4" }}
        spacing={4}
      >
        {categories.length > 0 && (
          <Section
            categories={categories}
            sectionRefs={sectionRefs}
            onCategoryClick={handleCategoryClick}
          />
        )}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            background: "#f3ece4",
            minHeight: "400px",
            flexWrap: "wrap",
            paddingInline: { lg: "10%" },
          }}
          spacing={4}
        >
          {currentItems.map((restaurant, index) => (
            <div key={restaurant._id} className="card">
              <div className="image-wrapper">
                <img src={restaurant.icon} alt={`Image ${index}`} />
              </div>
              <div className="text-wrapper">
                <Typography variant="h6">{restaurant.name}</Typography>
                <Link
                  to={"/menu/"+restaurant._id}
                  id="sign-link"
                  className="log4"
                  state={restaurant._id}
                >
                  <button className="bb2">View Menu</button>
                </Link>
              </div>
            </div>
          ))}
        </Stack>
        {Math.ceil(filteredRestaurants.length / itemsInPage)>1?
        <Stack direction="row" spacing={2} alignItems="center">
          <Button sx={{ fontSize: "2rem" }} onClick={handlePrev}>
            &larr;
          </Button>
          <Typography variant="h6">
            {page + 1} / {Math.ceil(filteredRestaurants.length / itemsInPage)}
          </Typography>
          <Button sx={{ fontSize: "2rem" }} onClick={handleNext}>
            &rarr;
          </Button>
        </Stack>:""}
      </Stack>
    </div>
  );
}
