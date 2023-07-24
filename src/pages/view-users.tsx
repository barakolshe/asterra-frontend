import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { SERVER_ADDRESS } from "../consts";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, CircularProgress, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface User {
  id: number;
  first_name?: string;
  last_name: string | null;
  address: string;
  phone_number: string;
  hobbies: string | null;
}

export default function ViewUsersPage() {
  const {
    isLoading,
    data: users,
    isError,
    error,
  } = useQuery({
    queryKey: ["get-users"],
    queryFn: () => axios.get(`${SERVER_ADDRESS}/user/users-hobbies`),
  });

  const queryClient = useQueryClient();

  const deleteHandler = (id: number) => {
    axios
      .delete(`${SERVER_ADDRESS}/user/${id}`)
      .then(() => {
        queryClient.invalidateQueries(["get-users"]);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to create hobbies");
      });
  };

  if (isError) {
    console.error(error);
    return (
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
  }

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ marginTop: "48px" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First name</TableCell>
            <TableCell align="right">Last name</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Phone number</TableCell>
            <TableCell align="right">Hobbies</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.data.map((user: User) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.first_name}
              </TableCell>
              <TableCell align="right">{user.last_name}</TableCell>
              <TableCell align="right">{user.address}</TableCell>
              <TableCell align="right">{user.phone_number}</TableCell>
              <TableCell align="right">{user.hobbies}</TableCell>
              <TableCell align="right" sx={{ padding: "0px 20px" }}>
                <IconButton
                  color="inherit"
                  aria-label="delete user"
                  edge="start"
                  onClick={() => deleteHandler(user.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
