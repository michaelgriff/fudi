import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submit = async () => {
    console.log(uuidv4());
    const body = {
      username,
      password,
      uuid: uuidv4(),
      following: "",
    };

    const response = await axios({
      method: "put",
      url: "https://u7px96sqy4.execute-api.us-east-2.amazonaws.com/users",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    });

    navigate("/");
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      {" "}
      <label>Username: </label>
      <input type="text" value={username || ""} onChange={onChangeUsername} />
      <br />
      <label>Password: </label>
      <input type="text" value={password || ""} onChange={onChangePassword} />
      <br />
      <label>Re-type Passowrd: </label>
      <input type="text" value={password || ""} />
      <br />
      <button onClick={submit}>Signup</button>
      <br />
    </div>
  );
};

export default Signup;
