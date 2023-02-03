import React, { useEffect, useState } from "react";
import axios from "axios";

import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #df2929;
  color: white;
  padding: 5px 20px;
  border-radius: 5px;
  border: none;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 2px;
`;

const StyledButtonGrey = styled.button`
  background-color: #484848;
  color: white;
  padding: 5px 20px;
  border-radius: 5px;
  border: none;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 2px;
`;

const FollowButton = ({ user, selected }) => {
  const [isFollowingBool, setIsFollowingBool] = useState("");

  useEffect(() => {
    const is = isFollowing();
    setIsFollowingBool(is);
  }, []);

  const post = async (followList) => {
    user.following = JSON.stringify(followList);

    const response = await axios({
      method: "put",
      url: "https://u7px96sqy4.execute-api.us-east-2.amazonaws.com/users",
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    });
  };

  const follow = async (event) => {
    event.stopPropagation();
    const following = JSON.parse(user.following);
    following.push(selected.uuid);
    setIsFollowingBool(true);

    await post(following);
  };

  const unfollow = async (event) => {
    event.stopPropagation();
    const following = JSON.parse(user.following);
    const filtered = following.filter((item) => item != selected.uuid);
    setIsFollowingBool(false);

    await post(filtered);
  };

  const isFollowing = () => {
    const following = JSON.parse(user.following);
    if (following.includes(selected.uuid)) {
      return true;
    }
    return false;
  };

  return (
    <div>
      {isFollowingBool ? (
        <StyledButtonGrey onClick={unfollow}>Following</StyledButtonGrey>
      ) : (
        <StyledButton onClick={follow}>Follow</StyledButton>
      )}
    </div>
  );
};

export default FollowButton;
