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
} from "../styles/LoginElements";
import logo from "../images/fudi-logo.png";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const response = await axios({
      method: "get",
      url: "https://u7px96sqy4.execute-api.us-east-2.amazonaws.com/users",
    });

    response.data.Items.forEach((user) => {
      if (user.username === username) {
        if (user.password === password) {
          setUser(user);
          navigate("/");
        }
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
            type="text"
            value={password || ""}
            onChange={onChangePassword}
            placeholder="Password"
          />
          <LoginButton onClick={submit}>Log in</LoginButton>
        </LoginContainer>
        <SignupContainer>
          <p>Don't have an account? Sign up</p>
        </SignupContainer>
      </CenteredLogin>
      {/* <button onClick={submit}>Submit</button> */}
      {/* <br /> */}
      {/* <button onClick={() => navigate("/signup")}>Sign Up</button> */}
    </LoginBackground>
  );
};

export default Login;
