import { Container, Paper } from "@mui/material";
import React from "react";

const FormLayout: React.FC<{
  children: React.ReactNode;
  info: React.ReactNode;
}> = ({ children, info }) => {
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        {children}
      </Paper>
      {info}
    </Container>
  );
};

export default FormLayout;
