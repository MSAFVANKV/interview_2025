import "./assets/css/style.css";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import { Outlet } from "react-router";
import { useMediaQuery } from "@mui/material";
import { cn } from "./lib/utils";
import NavbarDrawer, {
  DrawerHeader,
} from "./components/admin/app_bar/Navbar_Drawer";
import ThemProviderMui from "./components/metrialUi/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function AdminApp() {
  const client = new QueryClient();
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  return (
    <div
      className={cn(``, {
        "debug-screens": import.meta.env.MODE === "development",
      })}
    >
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <NavbarDrawer />
        <ThemProviderMui>
          <Box
            component="main"
            sx={{
              flexGrow: isLargeScreen ? 1 : 0,
              width: "100%",
              p: isLargeScreen ? 2 : 1,
              bgcolor: "#F7F7F7",
            }}
          >
            <DrawerHeader />
            <QueryClientProvider client={client}>
              <Outlet />
            </QueryClientProvider>
          </Box>
        </ThemProviderMui>
      </Box>
      {/* <div className="h-10 bg-white border-t text-gray-400 text-xs w-full flex justify-end items-center px-3">
      <span className="select-none text-xs">Copyright 2024 All Rights Are Reserved | © Ayaboo by Haash.Tech</span>
      </div> */}
    </div>
  );
}
