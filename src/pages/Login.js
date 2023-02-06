import React, { useState, useEffect } from "react";
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
  IncorrectWrapper,
} from "../styles/LoginElements";
import logo from "../images/fudi-logo.png";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);

  const submit = async () => {
    const response = await axios({
      method: "get",
      url: "https://u7px96sqy4.execute-api.us-east-2.amazonaws.com/users",
    });

    let temp = false;

    response.data.Items.forEach((user) => {
      if (user.username === username) {
        if (user.password === password) {
          setUser(user);
          navigate("/");
          temp = true;
        }
      }

      if (!temp) {
        setIncorrect(true);
      }
    });
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const handleClick = () => {};

  return (
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
          <LoginButton onClick={submit}>Log in</LoginButton>
          {incorrect ? (
            <IncorrectWrapper>
              The username/password you entered is incorrect.
            </IncorrectWrapper>
          ) : null}
        </LoginContainer>
        <SignupContainer>
          <p>
            Don't have an account?{" "}
            <SignupText onClick={() => navigate("/signup")}>Sign up</SignupText>
          </p>
        </SignupContainer>
      </CenteredLogin>
    </LoginBackground>
  );
};

export default Login;
