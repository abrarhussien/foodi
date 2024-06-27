import { Grid, Stack, Typography } from "@mui/material";
import Product from "./ProductCard";
import { IProduct } from "../../models/product.model";

interface IProps {
  name: string;
  products: IProduct[];
}

const Category = ({ name, products }: IProps) => {
  return (
    <Grid container sx={{ padding: "48px" }}>
      <Grid item xs={12} alignItems={"flex-end"}>
        <Typography
          variant="h4"
          gutterBottom
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: "40vh",
            fontWeight: "700",
            fontSize: "40px",
          }}
        >
          {name}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Stack
          direction={"row"}
          justifyContent={"space-around"}
          flexWrap={"wrap"}
        >
          {products.length ? (
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))
          ) : (
            <Typography variant="h2">Stay Tuned For Upcoming Items</Typography>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Category;
