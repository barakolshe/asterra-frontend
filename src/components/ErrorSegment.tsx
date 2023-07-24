import { Box, Typography } from "@mui/material";
import React from "react";

const ErrorSegment: React.FC = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100%"
  >
    <Typography variant="h2" color="error" fontWeight="bold">
      Error
    </Typography>
  </Box>
);

export default ErrorSegment;
