import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IProduct } from "../../models/product.model";
import axios from "../../api/axios";
import CartContext from "../../context/CartProvider";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

interface IProps {}

const Details = ({}: IProps) => {
  const theme = useTheme();
  const location = useLocation();
  const [productdetails, setProductDetails] = useState<IProduct>({
    _id: "",
    description: "",
    icon: "",
    ingredientsIds: [],
    menuCategoryId: {
      _id: "",
      icon: "",
      name: "",
      restaurantId: "",
    },
    price: 0,
    restaurantId: "",
    title: "",
  });
  const {
    setCartItems,
    setCartQuantity,
    setCartTotal,
    restaurantId,
    setRestaurantId,
    cartItems,
    calculateTotal,
    calculateQuantity,
  }: any = useContext(CartContext);
  const [showMore, setShowMore] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);

  const handleAddItemToCart = async (product: IProduct, quantity: number) => {
    try {
      const res = await axios.post(
        "/api/v1/cart",
        {
          productId: product._id,
          quantity: quantity,
        },
        {
          headers: { jwt: localStorage.getItem("token") },
        }
      );

      if (restaurantId && restaurantId !== product.restaurantId) {
        setCartItems([]);
        setCartQuantity(0);
        setCartTotal(0);
      }

      setCartItems(res.data.itemsIds);
      setCartQuantity((prevQuantity: number) => prevQuantity + quantity);
      setCartTotal((prevTotal: number) => prevTotal + product.price * quantity);
      setRestaurantId(product.restaurantId);
      setIsInCart(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveItemFromCart = async (productId: string) => {
    try {
      const res = await axios.delete(`/api/v1/cart/${productId}`, {
        headers: { jwt: localStorage.getItem("token") },
      });

      setCartItems(res.data.itemsIds);
      setCartQuantity((prevQuantity: number) => prevQuantity - 1);
      setCartTotal((prevTotal: number) => prevTotal - productdetails.price);
      setIsInCart(false);

      if (res.data.itemsIds.length === 0) {
        setRestaurantId("");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setProductDetails(location.state);

    if (location.state) {
      const productInCart = cartItems.some(
        (item: any) => item.productId === location.state._id
      );
      setIsInCart(productInCart);
    }
  }, [location.state, cartItems]);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent={"center"}
        marginBlock={"100px"}
        spacing={0}
        sx={{ height: "100%" }}
      >
        <Grid
          item
          xs={12}
          xl={4}
          sx={{
            display: "flex",
            alignItems: "stretch",
            margin: { xl: "0 20px 0 0", xs: "20px" },
          }}
        >
          <Box
            sx={{
              width: "100%",
              borderRadius: "25px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "700px",
            }}
          >
            <CardMedia
              component="img"
              image={productdetails?.icon}
              alt="Margherita Pizza"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          xl={6}
          sx={{
            backgroundColor: theme.palette.secondary.main,
            borderRadius: "25px",
            padding: { xs: "20px", md: "25px" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "700px",
            overflowY: "auto",
          }}
        >
          <CardContent
            sx={{
              textAlign: "left",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: "700",
                    fontSize: { xs: "24px", md: "32px" },
                    lineHeight: { xs: "32px", md: "48px" },
                    color: theme.palette.primary.main,
                  }}
                >
                  {productdetails?.title}
                </Typography>
                <Typography
                  variant="h6"
                  color="primary"
                  component="span"
                  sx={{
                    fontSize: { xs: "24px", md: "32px" },
                    fontWeight: "700",
                    display: { xs: "block", md: "inline" },
                  }}
                >
                  EGP {productdetails?.price}
                </Typography>
              </Stack>
              <Box
                sx={{ mt: { xs: "16px", md: "24px" }, position: "relative" }}
              >
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "16px", md: "24px" },
                    color: "black",
                    display: "-webkit-box",
                    WebkitLineClamp: showMore ? "none" : 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {productdetails?.description}
                </Typography>
                {productdetails.description.length > 100 && (
                  <Button
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.primary.main,
                      padding: "4px 8px",
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? "See Less" : "See More"}
                  </Button>
                )}
              </Box>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  mt: { xs: "16px", md: "24px" },
                  fontSize: { xs: "24px", md: "32px" },
                  fontWeight: "700",
                  color: theme.palette.primary.main,
                }}
              >
                Ingredients:
              </Typography>
              <Box
                sx={{
                  mt: "8px",
                  pr: "8px",
                }}
              >
                <Grid container spacing={2}>
                  {productdetails?.ingredientsIds.map((ingredient, index) => (
                    <Grid item xs={6} key={index}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: { xs: "16px", md: "24px" },
                          color: "black",
                        }}
                      >
                        - {ingredient.name}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </div>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ mt: { xs: "24px", md: "60px" } }}
            >
              <IconButton
                color="primary"
                sx={{ borderRadius: "50%", backgroundColor: "#f3ece4" }}
                onClick={handleDecreaseQuantity}
              >
                <RemoveIcon />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ fontSize: { xs: "20px", md: "24px" }, fontWeight: "700" }}
              >
                {quantity}
              </Typography>
              <IconButton
                color="primary"
                sx={{ borderRadius: "50%", backgroundColor: "#f3ece4" }}
                onClick={handleIncreaseQuantity}
              >
                <AddIcon />
              </IconButton>
            </Stack>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: { xs: "24px", md: "60px" },
              }}
            >
              {isInCart ? (
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    width: { xs: "100%", md: "577px" },
                    height: "64px",
                    borderRadius: "50px",
                    padding: "10px",
                    gap: "10px",
                    fontSize: { xs: "20px", md: "24px" },
                    fontWeight: "700",
                  }}
                  onClick={() => handleRemoveItemFromCart(productdetails._id)}
                >
                  <DeleteIcon />
                  Remove From Cart
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    width: { xs: "100%", md: "577px" },
                    height: "64px",
                    borderRadius: "50px",
                    padding: "10px",
                    gap: "10px",
                    fontSize: { xs: "20px", md: "24px" },
                    fontWeight: "700",
                  }}
                  onClick={() => handleAddItemToCart(productdetails, quantity)}
                >
                  <ShoppingCartIcon />
                  Add To Cart
                </Button>
              )}
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </>
  );
};

export default Details;
