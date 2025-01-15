
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
                // const tokenExpirationDate = new Date((JSON.parse(atob(token.split('.')[1]))).exp * 1000); 
                // document.cookie = `us-tkn=${response.data.token};  path=/; SameSite=Strict; Secure; HttpOnly`; 
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
                  width: "250px",
                }}
              >
                <Field
                  name="email"
                  id="email"
                  value={values.email}
                  type="email"
                  as={TextField}
                  style={{
                    padding:"px",
                    width: "100%",
                  }}
                  placeholder="Enter email"
                />
                <ErrorMessage name="email" component={"span"}
                  style={{
                    color: "red",
                    fontSize:"0.9rem",
                    fontFamily:"Helvetica",
                    marginTop:"5px"
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "250px",
                }}
              >
                <Field
                  name="password"
                  id="password"
                  type="password"
                  value={values.password}
                  as={TextField}
                  placeholder="Enter password"
                />
                <ErrorMessage
                  name="password"
                  component={"span"}
                  style={{
                    color: "red",
                    fontSize:"0.9rem",
                    fontFamily:"Helvetica",
                    marginTop:"5px"
                  }}
                />
              </Box>

              <Button
                type="submit"
              
                variant="contained"
                
                sx={{
                  bgcolor:"#5F08B1",
                  width: "100%",
                  color:"white"
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
