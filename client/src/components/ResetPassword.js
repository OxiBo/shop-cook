import React, { useEffect } from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "./styles/Button";
import ButtonsDiv from "./styles/ButtonsDiv";
import ErrorMessage from "./styles/ErrorMessage";
// import User from "./RenderProp/User";
import { resetPassword } from "../actions";

export const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  background-color: #f2efee;
  padding: 2rem;
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
  padding: 2rem;
  /* border: 1px solid ${(props) => props.theme.lightGrey}; */
  border-radius: 5px;
  box-shadow: -1px -5px 52px -5px rgba(222, 209, 222, 1);
  @media only screen and (min-width: 40rem) {
    margin: 5rem;
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

const ResetPassword = ({ error, resetPassword, ...props }) => {
  const history = useHistory();

  return (
    <Container>
      <h3>Reset Your Password!</h3>
      {error && (
        <ErrorMessage>
          <p>{error}</p>
        </ErrorMessage>
      )}
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validate={(values) => {
          const { password, confirmPassword } = values;
          const errors = {};

          if (password.length < 8 || password.length > 20) {
            errors.password = "Password has to be at least 8 characters long";
          }
          if (confirmPassword.length < 8 || confirmPassword.length > 20) {
            errors.confirmPassword =
              "Password has to be at least 8 characters long";
          }

          if (password !== confirmPassword) {
            errors.confirmPassword = "Your passwords do not match";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const resetToken = history.location.search.split("=")[1];
          try {
            resetPassword(resetToken, values.password, history);
            setSubmitting(false);
            {/* history.push("/"); */}
          } catch (err) {
            console.error(err);
          }
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
            <div>
              {" "}
              <label htmlFor="password">Password:</label>{" "}
              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <p>
                  {(errors.password && touched.password && errors.password) ||
                    errors.passwordNoMatch}
                </p>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>

              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
                <p>
                  {/* passwords no match error handling */}
                  {(errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword) ||
                    errors.passwordNoMatch}
                </p>
              </div>
            </div>

            <ButtonsDiv>
              <Button
                type="button"
                onClick={() => {
                  history.push("/");
                  {
                    /* history.goBack(); // TODO - check when it redirects if there were error messages while logging in  */
                  }
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Reset Password!
              </Button>
            </ButtonsDiv>
          </LogInForm>
        )}
      </Formik>
    </Container>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    error: auth.authError,
  };
};

export default connect(mapStateToProps, { resetPassword })(ResetPassword);
