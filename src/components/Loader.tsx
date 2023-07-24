import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loader: React.FC = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100%"
  >
    <CircularProgress />
  </Box>
);

export default Loader;
