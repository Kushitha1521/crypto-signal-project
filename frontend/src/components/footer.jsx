import React from "react";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedinIcon from "@mui/icons-material/LinkedIn"

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        py: 4,
        px: 2,
        textAlign: "center",
        background: "linear-gradient(to right, #16222A, #3A6073)",
        borderTop: "2px solid #00ffaa",
      }}
    >
      <Typography variant="h6" sx={{ color: "#ffffff", mb: 1, fontWeight: "bold" }}>
        CoinSignalLive
      </Typography>

      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
        Your real-time crypto companion 💹
      </Typography>

      <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 2 }}>
        <IconButton href="#" sx={{ color: "#00ffaa" }}>
          <LinkedinIcon />
        </IconButton>
        <IconButton href="https://github.com/Kushitha1521" sx={{ color: "#00ffaa" }}>
          <GitHubIcon />
        </IconButton>
        <IconButton href="#" sx={{ color: "#00ffaa" }}>
          <TwitterIcon />
        </IconButton>
      </Stack>

      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", mt: 3, display: "block" }}>
        © {new Date().getFullYear()} Kushitha Lakshitha. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
