import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import "./Register.module.css";
import * as Yup from "yup";
import { UserData } from "../../services/baseData";
import { Link, Navigate } from "react-router-dom";
import { UserRegister } from "../../services/Auth.services";

const Register = () => {
  const [isRedirect, setIsRedirect] = useState(false);
  const initialValue: UserData = {
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  };

  const SignupValidation = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(5, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password must match")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const onSubmit = (values: UserData, helpers: FormikHelpers<UserData>) => {
    console.log({ values, helpers });
    UserRegister(values)
      .then(() => {
        console.log(values);
        setIsRedirect(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (isRedirect)
    return (
      <>
        {" "}
        <Navigate replace to={"/login"} />{" "}
      </>
    );
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-10">
            <div className="card bg-light mt-5">
              <h2 className="card-title text-center font-weight-bold h1">
                Register
              </h2>
              <div className="card-body py-md-4">
                <Formik
                  onSubmit={onSubmit}
                  initialValues={initialValue}
                  validationSchema={SignupValidation}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="form-group">
                        <label htmlFor="username">UserName</label>
                        <Field
                          id="username"
                          className="form-control rounded"
                          name="username"
                          placeholder="Enter Username"
                        />
                        {errors.username && touched.username ? (
                          <div className="text-danger">{errors.username}</div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Field
                          id="email"
                          className="form-control rounded"
                          name="email"
                          placeholder="Enter Email"
                        />
                        {errors.email && touched.email ? (
                          <div className="text-danger">{errors.email}</div>
                        ) : null}
                      </div>
                      <div className="row">
                        <div className="form-group col">
                          <label htmlFor="password">Password</label>
                          <Field
                            id="password"
                            className="form-control rounded"
                            type={"password"}
                            name="password"
                            placeholder="Enter password"
                          />
                          {errors.password && touched.password ? (
                            <div className="text-danger">{errors.password}</div>
                          ) : null}
                        </div>

                        <div className="form-group col">
                          <label htmlFor="username">Confirm Password </label>
                          <Field
                            id="confirmPassword"
                            type={"password"}
                            className="form-control rounded"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                          />
                          {errors.confirmPassword && touched.confirmPassword ? (
                            <div className="text-danger">
                              {errors.confirmPassword}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <Link to={"/login"} className="text-danger">
                          Login
                        </Link>
                        <button className="btn btn-primary" type={"submit"}>
                          Create Account
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
