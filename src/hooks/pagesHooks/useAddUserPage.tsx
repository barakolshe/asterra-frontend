import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { SERVER_ADDRESS } from "../../consts";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const validationSchema = yup.object({
  first_name: yup.string().required("required"),
  last_name: yup.string(),
  phone_number: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address: yup.string().required("required"),
});

const initialFormState = {
  first_name: "",
  last_name: "",
  phone_number: "",
  address: "",
};

const useAddUserPage = () => {
  const [message, setMessage] = React.useState<{
    type: "success" | "error";
    message: string;
  }>({ type: "success", message: "" });

  const onSubmit = (data: any, actions: any) => {
    axios
      .post(`${SERVER_ADDRESS}/user`, data)
      .then(() => {
        setMessage({ type: "success", message: "User was created" });
        actions.resetForm(initialFormState);
      })
      .catch((error) => {
        console.error(error);
        setMessage({ type: "error", message: "Failed to create user" });
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

  return {
    formik,
    message,
    setMessage,
  };
};

export default useAddUserPage;
