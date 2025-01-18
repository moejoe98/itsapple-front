import { Box, CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <Box
      className="overlay"
      sx={{
        display: "flex", // Show the loader when loading is true
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "64px",
        left: 0,
        backgroundColor: "rgb(0,0,0,.3)",
        padding: "15px",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <CircularProgress sx={{ color: "grey" }} />
    </Box>
  );
}
