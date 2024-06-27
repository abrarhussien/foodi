import { Grid, CardMedia } from "@mui/material";
import { IRestaurant } from "../../models/restaurant.model";

interface IProps {
  restaurantInfo: IRestaurant;
}

const Image = ({ restaurantInfo }: IProps) => {
  return (
    <>
      <Grid>
        <CardMedia
          component="img"
          image={restaurantInfo.banner}
          alt="Placeholder Image"
          sx={{
            width: "100%",
            height: "520px",
            borderRadius: "25px",
          }}
        />
      </Grid>
    </>
  );
};

export default Image;
