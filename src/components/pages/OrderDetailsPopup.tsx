import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { IItem } from "../../models/item.model";
import { IOrder } from "../../models/order.model";

interface OrderDetailsPopupProps {
  open: boolean;
  handleClose: () => void;
  order: IOrder;
  items: IItem[];
}

const OrderDetailsPopup = ({
  open,
  handleClose,
  order,
  items,
}: OrderDetailsPopupProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTotalPrice = () => {
    let totalPrice = 0;

    items.forEach((ele) => {
      totalPrice += ele.productId.price * ele.quantity;
    });

    return totalPrice;
  };

  const handleTotalQuantity = () => {
    let totalQuantity = 0;

    items.forEach((ele) => {
      totalQuantity += ele.quantity;
    });

    return totalQuantity;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          width: isSmallScreen ? "100%" : "528px",
          height: isSmallScreen ? "100%" : "435px",
          backgroundColor: "#F3ECE5",
          borderRadius: isSmallScreen ? "0px" : "25px",
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ fontSize: "28px", mt: isSmallScreen ? "12px" : "24px" }}
          >
            Order Details
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              left: "3px",
              top: "1px",
              color: "#D7433980",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TableContainer
          sx={{
            maxHeight: isSmallScreen ? "calc(100vh - 200px)" : "236px",
            direction: "rtl",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.primary.main,
            },
          }}
        >
          <Table sx={{ direction: "ltr" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#D7433980",
                    borderBottom: "none",
                    fontSize: "20px",
                    fontWeight: "400",
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#F3ECE5",
                    zIndex: 1,
                  }}
                >
                  Item
                </TableCell>
                <TableCell
                  sx={{
                    color: "#D7433980",
                    borderBottom: "none",
                    fontSize: "20px",
                    fontWeight: "400",
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#F3ECE5",
                    zIndex: 1,
                  }}
                >
                  Qty
                </TableCell>
                <TableCell
                  sx={{
                    color: "#D7433980",
                    borderBottom: "none",
                    fontSize: "20px",
                    fontWeight: "400",
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#F3ECE5",
                    zIndex: 1,
                  }}
                >
                  Price
                </TableCell>
                <TableCell
                  sx={{
                    color: "#D7433980",
                    borderBottom: "none",
                    fontSize: "20px",
                    fontWeight: "400",
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#F3ECE5",
                    zIndex: 1,
                  }}
                >
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ borderBottom: "none" }}>
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{ width: "202px", mb: "-16px" }}
                    >
                      <img
                        src={item.productId.icon}
                        alt={item.productId.title}
                        style={{
                          width: "41px",
                          height: "40px",
                          marginRight: 8,
                        }}
                      />
                      <Typography sx={{ fontSize: "16px" }}>
                        {item.productId.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "60px",
                      padding: "0px",
                      textAlign: "center",
                      borderBottom: "none",
                      fontSize: "16px",
                    }}
                  >
                    {item.quantity}
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "60px",
                      padding: "0px",
                      textAlign: "center",
                      borderBottom: "none",
                      fontSize: "16px",
                    }}
                  >
                    EGP {item.productId.price}
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "60px",
                      padding: "0px",
                      textAlign: "center",
                      borderBottom: "none",
                      fontSize: "16px",
                    }}
                  >
                    EGP {item.productId.price * item.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          mt={3}
          display="flex"
          justifyContent="space-between"
          flexWrap={isSmallScreen ? "wrap" : "nowrap"}
        >
          <Box
            sx={{
              ml: isSmallScreen ? "0px" : "20px",
              mb: isSmallScreen ? 2 : 0,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "20px",
                fontWeight: "700",
                textAlign: isSmallScreen ? "center" : "left",
              }}
            >
              Total
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              EGP {}
            </Typography>
          </Box>
          <Box
            sx={{
              ml: isSmallScreen ? "0px" : "90px",
              mb: isSmallScreen ? 2 : 0,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "20px",
                fontWeight: "700",
                textAlign: isSmallScreen ? "center" : "left",
              }}
            >
              Qty
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              {handleTotalQuantity()}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body1"
              sx={{
                fontSize: "20px",
                fontWeight: "700",
                textAlign: isSmallScreen ? "center" : "left",
              }}
            >
              Price
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              EGP {handleTotalPrice()}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsPopup;
