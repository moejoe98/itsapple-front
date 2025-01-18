import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { LoginAsync } from "../redux/authSlice";
import { Cookies } from "react-cookie";
import Loader from "../sections/layouts/loader";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

function LoginContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const cookie = new Cookies();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.Auth);

  useEffect(() => {
    const token = cookie.get("token");
    const user = cookie.get("userData");
    if (token && user) {
      navigate("/");
    } else {
      setIsLoading(false); // Only render the form if no token found
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      success: true,
    },
    onSubmit: (values) => {
      dispatch(LoginAsync(values));
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    if (status === "error") {
      formik.setFieldValue("success", false);
    }
  }, [status, formik.setFieldValue]);

  const props = {
    values: formik.values,
    handleChange: formik.handleChange,
    errors: formik.errors,
    handleSubmit: formik.handleSubmit,
  };

  if (isLoading) {
    return <Loader />;
  }

  return <LoginPage {...props} />;
}

export default LoginContainer;
