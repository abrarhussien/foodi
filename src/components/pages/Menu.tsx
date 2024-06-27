import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";
import { IMenuCategory } from "../../models/menuCategory.model";
import { IProduct } from "../../models/product.model";
import { IRestaurant } from "../../models/restaurant.model";
import About from "../shared/About";
import Category from "../shared/Category";
import Image from "../shared/Image";
import Section from "../shared/Section";
import { Box } from "@mui/material";

export const Menu = () => {
  const location = useLocation();

  const [menu, setMenu] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<IMenuCategory[]>([]);
  const [restaurantInfo, setRestaurantInfo] = useState<IRestaurant>(
    {} as IRestaurant
  );

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleGetMenuItems = async () => {
    const res = await axios.get("/api/v1/products/" + location.state);
    setMenu(res.data);
  };

  const handleGetCategories = async () => {
    const res = await axios.get("/api/v1/categories/" + location.state);
    setCategories(res.data);
    console.log(res.data);
  };

  const handleGetRestaurantInfo = async () => {
    const res = await axios.get("/api/v1/restaurant/" + location.state);
    setRestaurantInfo(res.data);
  };

  useEffect(() => {
    handleGetMenuItems();
    handleGetCategories();
    handleGetRestaurantInfo();
  }, [location.state]);

  const handleCategoryClick = (categoryId: string) => {
    console.log("Category clicked:", categoryId);
  };

  return (
    <>
      <Image restaurantInfo={restaurantInfo} />
      <Section
        categories={categories}
        sectionRefs={sectionRefs}
        onCategoryClick={handleCategoryClick}
      />
      {categories.map((category) => (
        <Box
          id={category._id}
          key={category._id}
          ref={(el) => (sectionRefs.current[category._id] = el)}
          sx={{ marginBottom: "-280px" }}
        >
          <Category
            name={category.name}
            products={menu.filter(
              (item) => item.menuCategoryId._id === category._id
            )}
          />
        </Box>
      ))}
      <About restaurantInfo={restaurantInfo} />
    </>
  );
};
