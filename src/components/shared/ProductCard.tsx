import { CardMedia, Typography, useTheme, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../models/product.model";
import axios from "../../api/axios";
import { useContext } from "react";
import CartContext from "../../context/CartProvider";

interface ProductProps {
  product: IProduct;
}

const Product = ({ product }: ProductProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    setCartItems,
    setCartQuantity,
    setRestaurantId,
    calculateTotal,
    calculateQuantity,
  }:any = useContext(CartContext);

  const handleAddItemToCart = async (productId: string) => {
    try {
      if (!localStorage.getItem("token")) {
        navigate("/login");
      }
      const res = await axios.post(
        "/api/v1/cart",
        {
          productId,
          quantity: 1,
        },
        {
          headers: { jwt: localStorage.getItem("token") },
        }
      );
      setCartItems(res.data.itemsIds);
      calculateTotal(res.data.itemsIds);
      calculateQuantity(res.data.itemsIds);
      if (res.data.itemsIds.length == 1) {
        setRestaurantId(res.data.itemsIds[0].productId.restaurantId);
      }
    } catch (e) {}
  };

  return (
    <>
      <Stack
        position={"relative"}
        alignItems={"center"}
        sx={{
          backgroundColor: "#E8DCCC",
          padding: "24px",
          borderRadius: "25px",
          width: "380px",
          
        }}
        marginBottom={"180px"}
      >
        <CardMedia
          component="img"
          alt={product.title}
          image={product.icon}
          sx={{
            width: { xs: "200px", sm: "250px", md: "250px" },
            height: { xs: "200px", sm: "250px", md: "250px" },
            border: "10px solid",
            borderColor: theme.palette.primary.main,
            borderRadius: "50%",
            objectFit: "cover",
            position: "absolute",
            top: "-25%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <Typography sx={{ fontWeight: "700", fontSize: "24px", mt: "159px" }}>
          {product.title}
        </Typography>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Typography
            sx={{
              color: "#d84339",
              fontSize: { xs: "16px", sm: "18px" },
              mt: "34px",
            }}
          >
            Price
          </Typography>

          <Typography
            sx={{
              color: "#d84339",
              fontWeight: "bold",
              fontSize: { xs: "16px", sm: "18px" },
              mt: "34px",
            }}
          >
            {product.price}
          </Typography>
        </Stack>

        <Button
          onClick={() => {
            navigate("/productdetails", { state: product });
          }}
          variant="outlined"
          fullWidth
          sx={{
            borderRadius: "50px",
            border: "2px solid #d84339",
            "&:hover": {
              border: "2px solid #d84339",
            },
            color: "black",
            fontSize: "20px",
            fontWeight: "700",
            mt: "22px",
          }}
        >
          View Details
        </Button>

        <Button
          variant="contained"
          fullWidth
          sx={{
            borderRadius: "50px",
            backgroundColor: "#d84339",
            color: "white",
            fontSize: "20px",
            fontWeight: "700",
            mt: "16px",
          }}
          onClick={() => handleAddItemToCart(product._id)}
        >
          Add To Cart
        </Button>
      </Stack>
    </>
  );
};

export default Product;
