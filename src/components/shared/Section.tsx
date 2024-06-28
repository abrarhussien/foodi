import { Card, CardMedia, Grid, Box, Button } from "@mui/material";
import { IMenuCategory } from "../../models/menuCategory.model";
import { MutableRefObject } from "react";

interface IProps {
  categories: IMenuCategory[];
  sectionRefs: MutableRefObject<Record<string, HTMLDivElement | null>>;
  onCategoryClick: (categoryId: string) => void;
}

const Section = ({ categories, sectionRefs, onCategoryClick }: IProps) => {
  const scrollToSection = (id: string) => {
    const section = sectionRefs.current[id];
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#E8DCCC",
        width: "100%",
        borderRadius: "25px",
        mt: "70px",
        mb: "123px",
        padding: "30px 30px",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ padding:{xs:"0px",md: "0  100px"},gap:{xs:0,md:4,xl:0} }}
      >
        {categories.length
          ? categories.map((item, index) => (
              <Grid item key={index} xs={6} sm={4} md={3} lg={2} xl={1.5}>
                <Card
                  sx={{
                    width: "152px",
                    height: "224px",
                    gap: "0px",
                    opacity: "0.88px",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    mb: "15px",
                    marginInline:"auto"
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.icon}
                    alt={item.name}
                    sx={{
                      width: "100%",
                      height: "152px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      mb: "5px",
                    }}
                  />
                  <Box
                    sx={{
                      textAlign: "center",
                      padding: "0",
                    }}
                  >
                    <Button
                      sx={{
                        fontWeight: "700",
                        height: "64px",
                        fontSize: "20px",
                        color: "black",
                        transition: "background-color 0.3s",
                        "&:hover": {
                          backgroundColor: "#D74339",
                          borderRadius: "10px",
                        },
                      }}
                      onClick={() => {
                        scrollToSection(item._id);
                        onCategoryClick(item._id);
                      }}
                    >
                      {item.name}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))
          : ""}
      </Grid>
    </Box>
  );
};

export default Section;
