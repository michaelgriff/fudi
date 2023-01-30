import React, { useEffect, useState } from "react";
import axios from "axios";

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

  const follow = async () => {
    const following = JSON.parse(user.following);
    following.push(selected.uuid);
    setIsFollowingBool(true);

    await post(following);
  };

  const unfollow = async () => {
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
        <button onClick={async () => await unfollow()}>Following</button>
      ) : (
        <button onClick={async () => await follow()}>Follow</button>
      )}
    </div>
  );
};

export default FollowButton;
