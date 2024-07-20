import React, { useState } from "react";
import { UserData } from "../../services/baseData";
import * as Yup from "yup";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Link, Navigate } from "react-router-dom";
import { UserLogin } from "../../services/Auth.services";

const Login = () => {
  const [isRedirect, setIsRedirect] = useState(false);
  const initialValue: UserData = {
    username: "",
    password: "",
  };

  const SignupValidation = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (
    values: UserData,
    helpers: FormikHelpers<UserData>
  ) => {
    const { username, password } = values;
    try {
      const response = await UserLogin({ username, password });
      console.log(response);
      setIsRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (isRedirect)
    return (
      <>
        <Navigate replace to={"/"} />
      </>
    );
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-10">
            <div className="card bg-light mt-5">
              <h2 className="card-title text-center font-weight-bold h1">
                Login
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
                        <Field
                          id="username"
                          className="form-control"
                          name="username"
                          placeholder="Enter Username"
                        />
                        {errors.username && touched.username ? (
                          <div className="text-danger">{errors.username}</div>
                        ) : null}
                      </div>
                      <div className="row">
                        <div className="form-group col">
                          <Field
                            id="password"
                            className="form-control"
                            type={"password"}
                            name="password"
                            placeholder="Enter password"
                          />
                          {errors.password && touched.password ? (
                            <div className="text-danger">{errors.password}</div>
                          ) : null}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <p>
                          {" "}
                          Don't have an account,
                          <Link to={"/register"} className="text-danger">
                            {" "}
                            Register
                          </Link>
                        </p>
                        <button className="btn btn-primary" type={"submit"}>
                          Login
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

export default Login;
