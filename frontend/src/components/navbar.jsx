import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import TimelineIcon from "@mui/icons-material/Timeline";
import LightModeIcon from "@mui/icons-material/LightMode";

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(to right, #16222A, #3A6073)",
        boxShadow: "0px 4px 10px rgba(0, 255, 170, 0.2)",
        zIndex: 1400,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={1}>
          <TimelineIcon sx={{ color: "#00ffaa" }} />
          <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: "bold" }}>
            CoinSignalLive
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          {["Home", "Signals", "Insights", "Profile"].map((item) => (
            <Button
              key={item}
              sx={{
                color: "#ffffff",
                "&:hover": {
                  color: "#00ffaa",
                  backgroundColor: "rgba(0,255,170,0.1)",
                },
              }}
            >
              {item}
            </Button>
          ))}
        </Stack>

        <IconButton>
          <LightModeIcon sx={{ color: "#00ffaa" }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
