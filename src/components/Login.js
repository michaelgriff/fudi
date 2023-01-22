import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUuid }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const response = await axios({
      method: "get",
      url: "https://u7px96sqy4.execute-api.us-east-2.amazonaws.com/users",
    });
    console.log(response);

    response.data.Items.forEach((user) => {
      if (user.username === username) {
        if (user.password === password) {
          setUuid(user.uuid);
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
    <div>
      <label>Username: </label>
      <input type="text" value={username || ""} onChange={onChangeUsername} />
      <br />
      <label>Password: </label>
      <input type="text" value={password || ""} onChange={onChangePassword} />
      <br />
      <button onClick={submit}>Submit</button>
      <br />
      <button onClick={() => navigate("/signup")}>Sign Up</button>
    </div>
  );
};

export default Login;
