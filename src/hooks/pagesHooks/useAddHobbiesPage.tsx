import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios, { AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SERVER_ADDRESS } from "../../consts";

interface User {
  user_id: number | "";
  name: string;
  hobbies: string;
}

const validationSchema = yup.object({
  hobbies: yup.string().required("required"),
  user_id: yup.number().required("required"),
});

const initialFormState: { hobbies: string; user_id: number | "" } = {
  hobbies: "",
  user_id: "",
};
const transformUsers = (
  response: AxiosResponse<any, any>
): { user_id: number | ""; name: string; hobbies: string }[] => {
  return response.data.map((user: any) => ({
    user_id: user.id,
    name: `${user.first_name} ${user.last_name}`,
    hobbies: user.hobbies,
  }));
};

const useAddHobbiesPage = () => {
  const {
    isLoading,
    data: users,
    isError,
    error,
  } = useQuery({
    queryKey: ["get-users"],
    queryFn: () => axios.get(`${SERVER_ADDRESS}/user/users-hobbies`),
    select: transformUsers,
  });
  const queryClient = useQueryClient();

  const [message, setMessage] = React.useState<{
    type: "success" | "error";
    message: string;
  }>({ type: "success", message: "" });

  const onSubmit = (
    newHobbies: { user_id: number; hobbies: string },
    actions: any
  ) => {
    // Checking if hobbies exist already for the current user
    const request =
      users?.find((user: User) => user.user_id === newHobbies.user_id)
        ?.hobbies === null
        ? axios.post(`${SERVER_ADDRESS}/hobbies`, newHobbies)
        : axios.put(
            `${SERVER_ADDRESS}/hobbies/${newHobbies.user_id}`,
            newHobbies
          );

    request
      .then(() => {
        queryClient.invalidateQueries(["get-users"]);
        setMessage({ type: "success", message: "Hobbies were created" });
        actions.resetForm(initialFormState);
      })
      .catch((error) => {
        setMessage({ type: "error", message: "Failed to create hobbies" });
      });
  };

  React.useEffect(() => {
    if (message.type === "success" && message.message !== "") {
      // Getting rid of the message in 3 seconds from now
      setTimeout(() => setMessage({ type: "success", message: "" }), 2000);
    }
  }, [message, setMessage]);

  const formik = useFormik({
    initialValues: initialFormState,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const userSelectedHandler = (user_id) => {
    if (user_id === "") {
      formik.setFieldValue("user_id", user_id);
      formik.setFieldValue("hobbies", "");
    } else {
      const hobbies = users?.find((user) => user.user_id === user_id)?.hobbies;
      formik.setFieldValue("user_id", user_id);
      formik.setFieldValue("hobbies", hobbies !== null ? hobbies : "");
    }
  };

  return {
    formik,
    handlers: {
      userSelectedHandler,
    },
    queries: {
      users: {
        data: users,
        isLoading,
        isError,
        error,
      },
    },
    message,
    setMessage,
  };
};

export default useAddHobbiesPage;
