import React from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import FormLayout from "@/components/FormLayout";
import useAddUserPage from "../hooks/pagesHooks/useAddUserPage";

const AddUserPage = () => {
  const { formik, message } = useAddUserPage();
  const theme = useTheme();

  const Info = (
    <Typography
      variant="h5"
      align="center"
      gutterBottom
      color={
        message.type === "error"
          ? theme.palette.error.main
          : theme.palette.success.main
      }
    >
      {message.message}
    </Typography>
  );

  return (
    <FormLayout info={Info}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h4" align="center" gutterBottom>
          Add user
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="first_name"
              name="first_name"
              label="First name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.first_name && Boolean(formik.errors.first_name)
              }
              helperText={
                formik.touched.first_name &&
                formik.errors.first_name !== undefined
                  ? formik.errors.first_name.toString()
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="last_name"
              name="last_name"
              label="Last name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.last_name && Boolean(formik.errors.last_name)
              }
              helperText={
                formik.touched.last_name &&
                formik.errors.last_name !== undefined
                  ? formik.errors.last_name.toString()
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="address"
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={
                formik.touched.address && formik.errors.address !== undefined
                  ? formik.errors.address.toString()
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="phone_number"
              name="phone_number"
              label="Phone number"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.phone_number &&
                Boolean(formik.errors.phone_number)
              }
              helperText={
                formik.touched.phone_number &&
                formik.errors.phone_number !== undefined
                  ? formik.errors.phone_number.toString()
                  : ""
              }
            />
          </Grid>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Button
              color="primary"
              variant="contained"
              type="submit"
              sx={{ mt: 3 }}
            >
              Submit
            </Button>
          </Box>
        </Grid>
      </form>
    </FormLayout>
  );
};

export default AddUserPage;
