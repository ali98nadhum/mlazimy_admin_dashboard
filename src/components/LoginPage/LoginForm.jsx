import React, {useEffect, useState } from "react";
import { TextField, Button, Container, Box, Typography , Snackbar , Alert } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {useStore} from "../../store";
import {useNavigate} from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import logo from "../../assets/logo.png";
import "./loginForm.css";


const theme = createTheme({
  direction: "rtl",
});



const LoginForm = () => {

  // for show message alert
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const navigate = useNavigate();

  // from useStore
  const { login, errorMessage, clearErrorMessage } = useStore((state) => ({
    login: state.login,
    errorMessage: state.errorMessage,
    clearErrorMessage: state.clearErrorMessage
  }));

  useEffect(() => {
    if (errorMessage) {
      setSnackbarMessage(errorMessage);
      setOpen(true);
    }
  }, [errorMessage]);

  // yup valisation
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('الاميل غير صالح').required('الاميل مطلوب'),
    password: Yup.string().min(8, 'يجب ان تتكون كلمه المرور من 8 احرف ').required('كلمه المرور مطلوبه'),
  });


  // handle login from useStore
  const handleLogin = async (values, setSubmitting) => {
    const { email, password } = values;
    await login(email, password);
    setSubmitting(false);
    if (!errorMessage) {
      navigate("/");
    }
  };

  // for close message alert
  const handleClose = () => {
    setOpen(false);
    clearErrorMessage();
  };


  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box>
        <div className="logo">
            <img src={logo} alt="logo-image"/>
          </div>
          <Typography  align="center" mb={2} sx={{fontSize:32 , fontFamily: 'Almarai'}}>نظام اداره منصه ملازمي</Typography>
          <Typography  align="center" mb={2} sx={{fontSize:18 , fontFamily: 'Almarai'}}>يرجى التسجيل بحساب الادمن</Typography>

          
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleLogin(values, setSubmitting);
            }}
          >

            {({ isSubmitting }) => (
              <Form>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="email" />}
                    error={Boolean(<ErrorMessage name="email" />)}
                  />
                </Box>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="password" />}
                    error={Boolean(<ErrorMessage name="password" />)}
                    
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{fontFamily: 'Almarai', fontSize:18}}
                >
                  تسجيل الدخول
                </Button>
              </Form>
            )}
          </Formik>

          
          <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' , fontFamily: 'Almarai' , fontSize: 18 }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default LoginForm;
