import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
// import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDispatch, useSelector } from "react-redux";
import useNavigateClicks from "../../hooks/navigate-clicks";
// import { logout } from "../../routers/api";
import { logoutState } from "../../redux/userSide/action/authSlice";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { Badge } from "@mui/material";
import Cookies from "js-cookie";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const open = anchorEl;
  const { handleClick: navigate } = useNavigateClicks();
  //   const { handleLogout } = useAuth();
  const { user, isLogged } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseAndNavigate = (to) => {
    setAnchorEl(null);
    navigate(to);
  };

  const logout = () => {
    Cookies.remove("us_tkn");
    dispatch(logoutState());
    // window.location.reload();
    // Cookies.remove("us_b2b_kyc");

    navigate("/");
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        {isLogged && (
          <Tooltip title="Account settings">
            <div className="">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    textTransform: "capitalize",
                    bgcolor: "black",
                    margin: "auto",
                  }}
                >
                  {user?.email.slice(0, 1)}
                </Avatar>
              </IconButton>
            </div>
          </Tooltip>
        )}

        {/* =====  Notification ====== */}

        <>
          <Tooltip title="Super Admin">
            <IconButton
              onClick={() => handleCloseAndNavigate("/admin/products/add")}
              size="small"
              sx={{ ml: 0 }}
            >
              <Avatar
                sx={{ width: 32, height: 32, backgroundColor: "transparent" }}
              >
                {" "}
                {/* <Icon
                  icon={`ph:bell-light`}
                  fontSize={25}
                  className="text-black"
                /> */}
                <SupervisorAccountIcon fontSize="medium" />
              </Avatar>
            </IconButton>
          </Tooltip>

          {/* =====  Cart ====== */}
          <Tooltip title="My Cart">
            <IconButton
              onClick={() => handleCloseAndNavigate("/cart")}
              size="small"
              sx={{ ml: 0 }}
              color="white"
            >
              <Badge
                badgeContent={cartItems.length} // Display the number of items in the cart
                color="secondary" // Badge color
              >
                <Avatar
                  sx={{ width: 32, height: 32, backgroundColor: "transparent" }}
                >
                  {" "}
                  <Icon
                    icon={`mynaui:cart`}
                    fontSize={25}
                    className="text-black"
                    color="white"
                  />
                </Avatar>
              </Badge>
            </IconButton>
          </Tooltip>
        </>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              minWidth: "350px", // Minimum width of the menu
              overflow: "visible",
              mt: 1.5,
              px: 1.5,
              py: 1,
              borderRadius: "12px",
              boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.3)",
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%) translateY(-50%) rotate(45deg)",
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <MenuItem
          disabled
          sx={{
            fontWeight: "bold",
            color: "#5F08B1",
            mb: 1,
            userSelect: "none",
          }}
        >
          Hi, {user?.email.toUpperCase()}
        </MenuItem>
        {/* <Divider sx={{ my: 1 }} /> */}
        <MenuItem
          onClick={() => handleCloseAndNavigate("/admin/products/add")}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "&:hover": {
              bgcolor: "#F8F8F8", // Background color on hover
            },
            border: "1px solid #ede6e6",
            padding: "10px",
            borderRadius: 2,
            mb: 1,
          }}
          //   className="border border-black p-7"
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AccountCircleOutlinedIcon sx={{ color: "black", mr: 1 }} />
            <Typography variant="body2" fontWeight="medium">
              Account
            </Typography>
          </Box>
          <EastOutlinedIcon sx={{ fontSize: 16, color: "#6A0DAD" }} />
        </MenuItem>
        <MenuItem
          onClick={() => handleCloseAndNavigate("/my-account/my-orders")}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "&:hover": {
              bgcolor: "#F8F8F8", // Background color on hover
            },
            border: "1px solid #ede6e6",
            padding: "10px",
            borderRadius: 2,
            mb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ShoppingBagOutlinedIcon sx={{ color: "black", mr: 1 }} />
            <Typography variant="body2" fontWeight="medium">
              Order
            </Typography>
          </Box>
          <EastOutlinedIcon sx={{ fontSize: 16, color: "#6A0DAD" }} />
        </MenuItem>
        <MenuItem
          onClick={() => handleCloseAndNavigate("/my-account/my-wishlist")}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "&:hover": {
              bgcolor: "#F8F8F8", // Background color on hover
            },
            border: "1px solid #ede6e6",
            padding: "10px",
            borderRadius: 2,
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FavoriteBorderIcon sx={{ color: "black", mr: 1 }} />
            <Typography variant="body2" fontWeight="medium">
              Wishlist
            </Typography>
          </Box>
          <EastOutlinedIcon sx={{ fontSize: 16, color: "#6A0DAD" }} />
        </MenuItem>
        {/* <Divider sx={{ my: 1 }} /> */}
        <MenuItem
          onClick={() => {
            // logout();
            // handleLogout("/");
            handleCloseAndNavigate("/");
            logout();
          }}
          sx={{
            justifyContent: "center",
            fontWeight: "bold",
            color: "#A9A9A9",
            "&:hover": {
              bgcolor: "#F8F8F8", // Background color on hover
            },
            border: "1px solid #ede6e6",
            padding: "10px",
            borderRadius: 2,
          }}
        >
          Sign out
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
