import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button, { LinkButton } from "./styles/Button";
import ButtonsDiv from "./styles/ButtonsDiv";
import ErrorMessage from "./styles/ErrorMessage";
import User from "./RenderProp/User";
import { signUp as signUpAction, clearAuthError } from "../actions";
export const Container = styled.div`
  margin: 0 auto;
  min-width: fit-content;
  width: 100%;
  background-color: #f2efee;
  padding: 1rem;
  h3 {
    text-align: center;
    padding: 4rem 3rem 0rem 3rem;
    font-size: 3rem;
  }

  @media only screen and (min-width: 40rem) {
    width: 70%;
  }
  @media only screen and (min-width: 60rem) {
    width: 60%;
  }
`;

export const LogInForm = styled.form`
  margin: 1rem;
  padding: 0.5rem;
  /* border: 1px solid ${(props) => props.theme.lightGrey}; */
  border-radius: 5px;
  box-shadow: -1px -5px 52px -5px rgba(222, 209, 222, 1);
  @media only screen and (min-width: 40rem) {
    margin: 5rem;
    padding: 1.5rem;
  }
  div {
    display: flex;
    flex-direction: row;
    margin: 0.4rem;
    align-items: center;
    justify-content: center;
    /* flex-direction: column; */
    /* align-items: flex-start; */
    font-size: 1.5rem;
    label {
      width: 7rem;
    }
    div {
      display: flex;
      flex-direction: column;
      input {
        height: 3rem;
        border-radius: 10rem;
        align-items: center;
        padding-left: 1.5rem;
        transition: all 0.3s;
        border: none;
        background: white;
        font-family: inherit;
        color: inherit;
        font-size: ${(props) => props.theme.fontSize};
        width: 25rem;
        focus-within {
          transform: translateY(-2px);
          box-shadow: 0 0.7rem 3rem rgba(101, 90, 86, 0.08);
        }
      }
      input:focus {
        outline: none;
      }
      input:placeholder {
        color: #dad0cc;
      }
      p {
        font-size: 1.3rem;
        font-style: italic;
        padding: 0.4rem;
        color: ${(props) => props.theme.themeColor};
      }
    }
  }
`;

const SignIn = ({ signUpAction, clearAuthError, error, ...props }) => {
  const [signUp, setSignUp] = useState(false);
  return (
    <User>
      {(user) => {
        if (user) {
          //https://dev.to/projectescape/programmatic-navigation-in-react-3p1l#:~:text=import%20%7B%20Redirect%20%7D%20from%20%22react,the%20state%20of%20the%20component.&text=Whenever%20you%20want%20to%20redirect,rendering%20the%20component.
          return <Redirect to="/" />;
        } else {
          return (
            <Container>
              <h3>Welcome To Our Cooking Helper!</h3>
              {error && (
                <ErrorMessage>
                  <p>{error}</p>
                </ErrorMessage>
              )}
              <Formik
                enableReinitialize={true}
                initialValues={{
                  name: "",
                  password: "",
                  confirm: "",
                  email: "",
                }}
                validate={({ name, password, confirm, email }) => {
                  const errors = {};
                  if (!email) {
                    errors.email = "You must provide your email";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
                  ) {
                    errors.email = "Invalid email address";
                  }

                  if (signUp && !name) {
                    errors.name = "You must provide your name";
                  } else if (signUp && (name.length < 2 || name.length > 15)) {
                    errors.name =
                      "Name cannot be less than 3 or more than 15 characters";
                  }
                  if (password.length < 8 || password.length > 20) {
                    errors.password =
                      "Password has to be at least 8 characters long";
                  }

                  if (confirm !== password) {
                    errors.confirm = "Passwords do not match";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  values.email = values.email.toLowerCase();
                  delete values.confirm;
                  signUpAction(values, props.history);
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue,
                  setFieldTouched,
                  /* and other goodies */
                }) => (
                  <LogInForm onSubmit={handleSubmit}>
                    {signUp && (
                      <div>
                        <label htmlFor="name">Name: </label>
                        <div>
                          {" "}
                          <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                          />{" "}
                          <p>{errors.name && touched.name && errors.name}</p>
                        </div>
                      </div>
                    )}

                    <div>
                      {" "}
                      <label htmlFor="email">Email:</label>{" "}
                      <div>
                        {" "}
                        <input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        <p> {errors.email && touched.email && errors.email}</p>
                      </div>
                    </div>

                    <div>
                      {" "}
                      <label htmlFor="password">Password:</label>{" "}
                      <div>
                        {" "}
                        <input
                          type="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />{" "}
                        <p>
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </p>
                      </div>
                    </div>
                    {signUp && (
                      <div>
                        {" "}
                        <label htmlFor="confirm">Confirm Password:</label>{" "}
                        <div>
                          {" "}
                          <input
                            type="password"
                            name="confirm"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirm}
                          />{" "}
                          <p>
                            {errors.confirm &&
                              touched.confirm &&
                              errors.confirm}
                          </p>
                        </div>
                      </div>
                    )}
                    <ButtonsDiv>
                      {" "}
                      <Button type="submit" disabled={isSubmitting}>
                        {signUp ? "Sign Up" : "Log In"}
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          clearAuthError();
                          // clear the form
                          setFieldValue("name", "");
                          setFieldValue("email", "");
                          setFieldValue("password", "");
                          // make sure there will be more error messages arrear
                          setFieldTouched("name", false);
                          setFieldTouched("email", false);
                          setFieldTouched("password", false);
                          setSignUp(!signUp);
                        }}
                      >
                        {signUp
                          ? "Already Have An Account?"
                          : "Need An Account?"}
                      </Button>
                      <LinkButton>
                        <Link to="/request-reset"> Forgot Password?</Link>
                      </LinkButton>
                    </ButtonsDiv>
                  </LogInForm>
                )}
              </Formik>
            </Container>
          );
        }
      }}
    </User>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    error: auth.authError,
  };
};

export default connect(mapStateToProps, { signUpAction, clearAuthError })(
  SignIn
);
