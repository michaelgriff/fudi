import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = ({ user }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios({
        method: "get",
        url: "https://u7px96sqy4.execute-api.us-east-2.amazonaws.com/users",
      });
      const userList = response.data.Items.filter(
        (item) => item.uuid != user.uuid
      );

      return userList;
    };
    fetch().then((userList) => {
      setUsers(userList);
    });
  }, []);

  const follow = async (selected) => {
    const following = JSON.parse(user.following);
    following.push(selected.uuid);

    user.following = JSON.stringify(following);

    const response = await axios({
      method: "put",
      url: "https://u7px96sqy4.execute-api.us-east-2.amazonaws.com/users",
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    });
  };
  return (
    <div>
      {users.map((item) => (
        <div>
          <p>{item.username}</p>
          <button onClick={() => follow(item)}>Follow</button>
        </div>
      ))}
    </div>
  );
};

export default Users;
