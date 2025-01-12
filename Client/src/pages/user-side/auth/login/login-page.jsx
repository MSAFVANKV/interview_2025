import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { login } from '../../redux/actions/authActions';
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid2";

import "./LoginPage.scss";
import { setUserData } from "../../../../redux/userSide/action/authSlice";

function LoginPage() {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password should be at least 6 characters")
      .required("Password is required"),
  });

  //   const formik = useFormik({
  //     initialValues: {
  //       email: "",
  //       password: "",
  //     },
  //     validationSchema: validationSchema,
  //     onSubmit: (values) => {
  //       dispatch(setUserData(values)); // Dispatch login action
  //     },
  //   });

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="login-form">
        <Typography variant="h5" className="login-title">
          Login
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values }) => (
            <Form>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Field
                  name="email"
                  id="email"
                  value={values.email}
                  as={TextField}
                />
                <ErrorMessage name="email" component={"span"} />
              </Box>

              <Button
                type="submit"
                sx={{
                  width: "100%",
                }}
              >    
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}

export default LoginPage;
