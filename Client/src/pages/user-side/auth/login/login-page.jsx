
import { useDispatch } from "react-redux";
// import { login } from '../../redux/actions/authActions';
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import "./LoginPage.scss";
import { setUserData } from "../../../../redux/userSide/action/authSlice";
import { Login_Api } from "../../../../routers/api";
import { useNavigate } from "react-router";
import { makeToast } from "../../../../lib/helper";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          onSubmit={async (values) => {
            // console.log(values);
            try {
              const response = await Login_Api({ email: values.email, password: values.password })
              // console.log(response, 'response');

              if (response.status === 200 || response.status === 201) {
                dispatch(setUserData(values)); // Dispatch login action
                navigate('/')
                makeToast(`${response.data.message}`)
              }
            } catch (error) {
              makeToast(`server error`)
              console.error(error);
              

            }
            dispatch(setUserData(values)); // Dispatch login action
          }}
        >
          {({ values }) => (
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
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
                  type="email"
                  as={TextField}
                  placeholder="enter email"
                />
                <ErrorMessage name="email" component={"span"}
                  style={{
                    color: "red",
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Field
                  name="password"
                  id="password"
                  type="password"
                  value={values.password}
                  as={TextField}
                  placeholder="enter password"
                />
                <ErrorMessage
                  name="password"
                  component={"span"}
                  style={{
                    color: "red",
                  }}
                />
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
