import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  LoginBackground,
  CenteredLogin,
  LoginContainer,
  LoginInput,
  LoginButton,
  Logo,
  SignupContainer,
  SignupText,
} from "../styles/LoginElements";
import logo from "../images/fudi-logo.png";

const Signup = ({ user }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const navigate = useNavigate();

  const submit = async () => {
    if (password === passwordAgain) {
      const body = {
        username,
        password,
        uuid: uuidv4(),
        following: "[]",
      };

      const response = await axios({
        method: "put",
        url: "https://u7px96sqy4.execute-api.us-east-2.amazonaws.com/users",
        headers: {
          "Content-Type": "application/json",
        },
        data: body,
      });

      navigate("/home");
    }
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangePasswordAgain = (e) => {
    setPasswordAgain(e.target.value);
  };

  return (
    <div>
      <LoginBackground>
        <CenteredLogin>
          <LoginContainer>
            <Logo src={logo} alt={"logo"} />
            <LoginInput
              type="text"
              value={username || ""}
              onChange={onChangeUsername}
              placeholder="Username"
            />
            <LoginInput
              type="password"
              value={password || ""}
              onChange={onChangePassword}
              placeholder="Password"
            />
            <LoginInput
              type="password"
              value={passwordAgain || ""}
              onChange={onChangePasswordAgain}
              placeholder="Re-Type Password"
            />
            <LoginButton onClick={submit}>Sign up</LoginButton>
          </LoginContainer>
          <SignupContainer>
            <p>
              Already have an account?{" "}
              <SignupText onClick={() => navigate("/login")}>Log in</SignupText>
            </p>
          </SignupContainer>
        </CenteredLogin>
      </LoginBackground>
    </div>
  );
};

export default Signup;
