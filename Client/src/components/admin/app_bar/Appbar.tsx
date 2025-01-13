import {
  Box,
  IconButton,
  styled,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from 'react'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";``
import MenuIcon from '@mui/icons-material/Menu';

import {  Fullscreen, PublicOutlined } from "@mui/icons-material";
import FullViewScreen from "../../../hooks/FullViewScreen";
import useNavigateClicks from "../../../hooks/navigate-clicks";
import { makeToast } from "../../../lib/helper";

type Props = {
  open: boolean;
  drawerWidth: number;
  title?: string;
  handleDrawerOpen: () => void;
  logo?: string;
};

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export default function NavAppBar({
  open,
  drawerWidth,
  handleDrawerOpen,
}: Props) {
  // handle full screen mode ====
  const { handleFullScreen } = FullViewScreen();
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  // click
  const { handleClick } = useNavigateClicks();

    // Clear cache function
    const handleClearCache = () => {
      if (window.caches) {
        caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => caches.delete(key)));
        });
      }
      localStorage.clear();
      sessionStorage.clear();
      makeToast("Cache cleared successfully!"); // Show success toast
      setTimeout(() => {
        window.location.reload();
      }, 1500); 
    };

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer - 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: "none", // Remove the shadow here
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <AppBar
      position="fixed"
      color="default"
      sx={{
        boxShadow: " rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
        display: "flex",
        // borderBottom:"0.9px solid #4E4E4E"
      }}
      open={open}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          // borderBottom:"0.9px solid #4E4E4E"
        }}
      >
        <Toolbar>
          <div className="">
           <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, marginLeft:isLargeScreen ?5:0, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>    
          </div>
       
          <Typography variant="h6" noWrap component="div">
            {/* <img src={MyLogo} alt="My Logo" style={{ height: '40px', marginRight: '10px' }} /> */}
          </Typography>
        </Toolbar>

        {/* ======  navbar right side starts here =======
        ==================================================== */}

        <Box mr="1rem" display="flex" gap="" alignItems="center">
          {/* Full screen btn ======
            ========================== */}
          <Tooltip title="Full Screen">
            <div className="">
                   <IconButton onClick={handleFullScreen}>
              <Fullscreen />
            </IconButton>
            </div>
       
          </Tooltip>

          {/* Home btn ======
            ========================== */}

          <Tooltip title="home">
          <div className="">
          <IconButton onClick={() => handleClick("/")}>
              <PublicOutlined />
            </IconButton>
          </div>
          </Tooltip>

          {/* Notification btn ======
            ========================== */}

          {/* <NotificationBarSheet /> */}

           {/* Clear Cache Button */}
           <Tooltip title="Clear Cache">
           <div className="">
           <IconButton onClick={handleClearCache}>
              <img src="/icons/clear-catche.svg" alt="clear cache" width={23} height={23} />
              {/* <CleaningServicesIcon /> */}
            </IconButton>
           </div>
          </Tooltip>


          {/* User Details avatar and more settings =====
        ================================================ */}
       

          {/* =============================== */}
        </Box>
      </Box>
    </AppBar>
  );
}
