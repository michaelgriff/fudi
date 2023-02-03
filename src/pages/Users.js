import React, { useState, useEffect } from "react";
import axios from "axios";
import FollowButton from "../components/FollowButton";
import { useNavigate } from "react-router-dom";
import {
  RestaurantContainer,
  SearchContainer,
  SearchInput,
  ResultContainer,
  ResultName,
  NameContainer,
  MenuContainer,
  SearchLogoContainer,
} from "../styles/RestaurantsElements";
import { BiUser, BiSearch } from "react-icons/bi";

const Users = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

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

  const filteredUsers = users
    ? users.filter((user) =>
        user.username.toLowerCase().includes(query.toLowerCase())
      )
    : null;

  const toProfile = (user) => {
    navigate(`/profile/${user.username}`, {
      state: { user },
    });
  };

  return (
    <div>
      {/* <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {filteredUsers.map((item) => (
        <div>
          <p onClick={() => toProfile(item)}>{item.username}</p>
          <FollowButton user={user} selected={item} />
        </div>
      ))} */}
      <div>
        <RestaurantContainer>
          <SearchContainer>
            <SearchLogoContainer>
              <BiSearch />
            </SearchLogoContainer>
            <SearchInput
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
            />
          </SearchContainer>
          {filteredUsers.map((item) => (
            <ResultContainer onClick={() => toProfile(item)}>
              <NameContainer>
                <MenuContainer>
                  <BiUser />
                </MenuContainer>
                <ResultName>{item.username}</ResultName>
              </NameContainer>
              <FollowButton user={user} selected={item} />
            </ResultContainer>
          ))}
        </RestaurantContainer>
      </div>
    </div>
  );
};

export default Users;
