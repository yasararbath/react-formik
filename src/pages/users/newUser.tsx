import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Field, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Wrapper from "../../components/Wrapper";
import { UserData } from "../../services/baseData";
import useUser from "../../Api/useUser";

const NewUser = () => {
  const [isRedirect, setIsRedirect] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { createUser } = useUser();

  const initialValues: UserData = {
    username: "",
    email: "",
    password: "",
  };

  const userValidationSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too short!")
      .max(50, "Too long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (
    values: UserData,
    { setSubmitting }: FormikHelpers<UserData>
  ) => {
    setIsSaving(true);
    try {
      await createUser(values);
      setIsRedirect(true);
    } catch (error) {
      console.error("Failed to create user", error);
    } finally {
      setIsSaving(false);
      setSubmitting(false);
    }
  };

  if (isRedirect) {
    return <Navigate replace to="/users" />;
  }

  return (
    <Wrapper>
      <nav aria-label="breadcrumb" className="mx-3">
        <ol className="breadcrumb pt-3">
          <li className="breadcrumb-item active" aria-current="page">
            Users
          </li>
        </ol>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="container">
                  <div className="row justify-content-center text-center">
                    <div className="col-md-10">
                      <div className="card bg-light mt-5">
                        <h2 className="card-title text-center font-weight-bold h1">
                          Add a New User
                        </h2>
                        <div className="card-body py-md-4">
                          <Formik
                            initialValues={initialValues}
                            validationSchema={userValidationSchema}
                            onSubmit={onSubmit}
                          >
                            {({
                              errors,
                              touched,
                              isSubmitting,
                              handleSubmit,
                            }) => (
                              <form onSubmit={handleSubmit}>
                                <div className="row">
                                  <div className="form-group col">
                                    <label htmlFor="username">Username</label>
                                    <Field
                                      id="username"
                                      className="form-control rounded"
                                      name="username"
                                      placeholder="Enter Username"
                                    />
                                    {errors.username && touched.username && (
                                      <div className="text-danger">
                                        {errors.username}
                                      </div>
                                    )}
                                  </div>
                                  <div className="form-group col">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                      id="email"
                                      type="email"
                                      className="form-control rounded"
                                      name="email"
                                      placeholder="Enter Email"
                                    />
                                    {errors.email && touched.email && (
                                      <div className="text-danger">
                                        {errors.email}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="password">Password</label>
                                  <Field
                                    id="password"
                                    type="password"
                                    className="form-control rounded"
                                    name="password"
                                    placeholder="Enter Password"
                                  />
                                  {errors.password && touched.password && (
                                    <div className="text-danger">
                                      {errors.password}
                                    </div>
                                  )}
                                </div>
                                <div className="d-flex flex-row align-items-center justify-content-between">
                                  <Link to="/users" className="text-danger">
                                    Users
                                  </Link>
                                  <button
                                    className="btn btn-primary"
                                    type="submit"
                                    disabled={isSubmitting || isSaving}
                                  >
                                    {isSaving ? "Saving..." : "Save"}
                                  </button>
                                </div>
                              </form>
                            )}
                          </Formik>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default NewUser;
