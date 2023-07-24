import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import FormLayout from "@/components/FormLayout";
import ErrorSegment from "@/components/ErrorSegment";
import Loader from "@/components/Loader";
import useAddHobbiesPage from "@/hooks/pagesHooks/useAddHobbiesPage";

const AddHobbiesPage = () => {
  const {
    formik,
    handlers: { userSelectedHandler },
    queries: {
      users: { data: usersData, isError, isLoading, error },
    },
    message,
  } = useAddHobbiesPage();

  const theme = useTheme();

  if (isError) {
    console.error(error);
    return <ErrorSegment />;
  }

  if (isLoading) {
    return <Loader />;
  }

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
          Add hobbies
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              error={formik.touched.user_id && Boolean(formik.errors.user_id)}
            >
              <InputLabel id="demo-simple-select-label">User</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                value={formik.values.user_id}
                onChange={(e) => userSelectedHandler(e.target.value)}
                onBlur={formik.handleBlur}
              >
                <MenuItem value="" key="none">
                  <em>None</em>
                </MenuItem>
                {usersData.map(({ name, user_id }) => (
                  <MenuItem value={user_id} key={user_id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {formik.touched.user_id && formik.errors.user_id !== undefined
                  ? formik.errors.user_id.toString()
                  : ""}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={8}>
            <TextField
              fullWidth
              id="hobbies"
              name="hobbies"
              label="Hobbies"
              multiline
              rows={4}
              value={formik.values.hobbies}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.hobbies && Boolean(formik.errors.hobbies)}
              helperText={
                formik.touched.hobbies && formik.errors.hobbies !== undefined
                  ? formik.errors.hobbies.toString()
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

export default AddHobbiesPage;
