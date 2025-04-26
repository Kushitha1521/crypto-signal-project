
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Chip,
  CircularProgress,
  Card,
  Container,
  Grid,
  useTheme
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RefreshIcon from "@mui/icons-material/Refresh";
import AnalyticsIcon from "@mui/icons-material/Analytics";

function App() {
  const [signals, setSignals] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  const fetchSignals = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://cryptosignal-production.up.railway.app/signals");
      const data = await res.json();
      setSignals(data);
    } catch (error) {
      console.error("Error fetching signals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignals();
    const interval = setInterval(fetchSignals, 10000);
    return () => clearInterval(interval);
  }, []);

  const getSignalColor = (signal) => {
    if (signal === "Buy") return "success";
    if (signal === "Sell") return "error";
    return "warning";
  };

  const getSignalIcon = (signal) => {
    if (signal === "Buy") return <TrendingUpIcon />;
    if (signal === "Sell") return <TrendingDownIcon />;
    return <TrendingFlatIcon />;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        py: 4,
        px: 2
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 800,
            color: theme.palette.primary.light,
            mb: 4,
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2
          }}
        >
          <AnalyticsIcon fontSize="large" /> Live Crypto Signals
        </Typography>

        {loading && !signals ? (
          <Box display="flex" justifyContent="center" my={8}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card
                elevation={8}
                sx={{
                  borderRadius: 2,
                  background: "rgba(26, 32, 53, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)"
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Typography variant="h6" color="primary.light">
                    Current Market Signals
                  </Typography>
                  <Chip
                    icon={<RefreshIcon />}
                    label="Refreshes every 10 seconds"
                    variant="outlined"
                    color="primary"
                    size="small"
                  />
                </Box>

                <TableContainer component={Paper} sx={{ bgcolor: "transparent" }}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Coin</TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Signal</TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Price</TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Time</TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>EMA 20</TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>EMA 50</TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>RSI</TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>MACD</TableCell>
                        <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>MACD Signal</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {signals &&
                        Object.entries(signals).map(([coin, data]) => (
                          <TableRow
                            key={coin}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                              "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                              transition: "background-color 0.3s"
                            }}
                          >
                            <TableCell component="th" scope="row" sx={{ color: "#fff" }}>
                              <Typography variant="body1" fontWeight="bold" color="primary.light">
                                {coin}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                icon={getSignalIcon(data.signal)}
                                label={data.signal}
                                color={getSignalColor(data.signal)}
                                variant="filled"
                              />
                            </TableCell>
                            <TableCell sx={{ color: "#fff" }}>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <AttachMoneyIcon fontSize="small" color="primary" />
                                {data.price.toFixed(2)}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ color: "#fff" }}>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <AccessTimeIcon fontSize="small" color="secondary" />
                                {new Date(data.time).toLocaleString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                  hour12: true,
                                  timeZoneName: "short"
                                })}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ color: "#fff" }}>{data.ema20.toFixed(2)}</TableCell>
                            <TableCell sx={{ color: "#fff" }}>{data.ema50.toFixed(2)}</TableCell>
                            <TableCell sx={{ color: "#fff" }}>{data.rsi.toFixed(2)}</TableCell>
                            <TableCell sx={{ color: "#fff" }}>{data.macd.toFixed(4)}</TableCell>
                            <TableCell sx={{ color: "#fff" }}>
                              {data.macd_signal.toFixed(4)}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
          </Grid>
        )}

        <Box component="footer" sx={{ mt: 6, textAlign: "center", color: "rgba(255,255,255,0.5)" }}>
          <Typography variant="body2">
            Built with ❤️ by Kushitha | Material UI Crypto Dashboard
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default App;