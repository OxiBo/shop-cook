import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Container, LogInForm } from "./SignIn";
// import { requestReset } from "../action";
import ErrorMessage from "./styles/ErrorMessage";
import ButtonsDiv from "./styles/ButtonsDiv";
import Button from "./styles/Button";
import ErrorText from "./styles/ErrorText";

const RequestReset = (props) => {
  const [myEmail, setMyEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [resetError, setResetError] = useState("");
  const history = useHistory();
  return (
    <Container>
      <h3>Request Password Reset</h3>
      {resetError && (
        <ErrorMessage>
          <p>{resetError}</p>
        </ErrorMessage>
      )}
      <LogInForm
        onSubmit={async (e) => {
          e.preventDefault();
          if (!emailError) {
            /* console.log(myEmail); */

            try {
              const res = await axios.patch("/api/request-reset", {
                email: myEmail,
              });
              {/* console.log(res); */}
              setResetError("");
              setEmailError("");
              toast(res.data.message);
              history.push("/");
            } catch (err) {
              console.error(err);
              setResetError(err);
            }
          }
        }}
      >
        <div>
          <label htmlFor="email">Email: </label>
          <div>
            <input
              type="text"
              required
              name="email"
              value={myEmail}
              onChange={(e) => {
                setMyEmail(e.target.value);
              }}
              onBlur={() => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(myEmail)) {
                  setEmailError("Invalid email address");
                }
              }}
            />
            {emailError && <ErrorText>{emailError}</ErrorText>}
          </div>
        </div>
        <ButtonsDiv>
          <Button onClick={() => history.goBack()}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </ButtonsDiv>
      </LogInForm>
    </Container>
  );
};

export default RequestReset;
