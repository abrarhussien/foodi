import { Box, Button, Stack, Typography } from "@mui/material";


export default function ConfirmDeleteFromCart({
    setShowDeleteItemPopUp,handleDeleteItem,itemToDelete,setItemToDelete
}: any) {


  return (
    <>
      
        <Stack
          position={"fixed"}
          width={"100vw"}
          height={"100vh"}
          top={0}
          left={0}
          zIndex={2}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            sx={{
              backgroundColor: "#F3ECE4",
              borderRadius: "25px",
              padding: "16px 28px 24px 28px",
            }}
          >
            

            <Typography sx={{marginTop:"20px"}}>
              Are you sure you want to delete this Item from cart?
            </Typography>

            <Stack
              marginTop={"24px"}
              spacing={"40px"}
              width={"100%"}
              justifyContent={"center"}
              direction={"row"}
            >
              <Button
                onClick={()=>{handleDeleteItem(itemToDelete); setItemToDelete(null);}}
                variant={"outlined"}
                sx={{
                  width: "96px",
                }}
              >
                {" "}
                Yes{" "}
              </Button>

              <Button
                onClick={() => {
                    setShowDeleteItemPopUp(false)
                }}
                variant={"contained"}
                sx={{
                  width: "96px",
                }}
              >
                {" "}
                Cancel{" "}
              </Button>
            </Stack>
          </Box>
        </Stack>
      
    </>
  );
}
