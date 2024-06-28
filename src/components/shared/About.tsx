import { Box, Grid, Typography } from "@mui/material";
import { IRestaurant } from "../../models/restaurant.model";

interface IProps {
  restaurantInfo: IRestaurant;
}

const About = ({ restaurantInfo }: IProps) => {
  return (
    <>
      <Grid
        item
        xs={12}
        sx={{ width: "100%", marginTop: "90px", marginBottom: "200px" }}
      >
        <Box
          sx={{
            textAlign: "center",
            marginBottom: 4,
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "700", fontSize: "32px", mb: "8px" }}
          >
            About
          </Typography>
          <Typography sx={{ fontWeight: "400", fontSize: "24px", mb: "16px" }}>
            {restaurantInfo.description}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: "700", fontSize: "32px", mb: "8px" }}
          >
            Address
          </Typography>
          <Typography sx={{ fontWeight: "400", fontSize: "24px", mb: "16px" }}>
            {restaurantInfo.address}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: "700", fontSize: "32px", mb: "8px" }}
          >
            Phone number
          </Typography>
          <Typography sx={{ fontWeight: "400", fontSize: "24px" }}>
            {restaurantInfo.phone}
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

export default About;
