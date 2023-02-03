import React, { useState, useEffect } from "react";
import axios from "axios";
import Restaurant from "../components/Restaurant";
import { useLocation } from "react-router-dom";
import {
  RestaurantContainer,
  SearchContainer,
  SearchInput,
  ResultContainer,
  ResultName,
  ResultAddress,
  NameContainer,
  MenuContainer,
  SearchLogoContainer,
} from "../styles/RestaurantsElements";
import { BiFoodMenu, BiSearch } from "react-icons/bi";

const Restaurants = ({ user }) => {
  const [restList, setRestList] = useState([]);
  const [selected, setSelected] = useState("");
  const [showItems, setShowItems] = useState(false);
  const [query, setQuery] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setSelected(location.state.restaurant_id);
      setShowItems(true);
    }
  }, [location.state]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios({
        method: "get",
        url: "https://u7px96sqy4.execute-api.us-east-2.amazonaws.com/restaurants",
      });
      return response;
    };

    fetch().then((response) => {
      setRestList(response.data.Items);
    });
  }, []);

  const filteredItems = restList
    ? restList.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    : null;

  const handleItemClick = (item) => {
    setSelected(item);
    setShowItems(true);
  };

  return (
    <div>
      {showItems ? (
        <Restaurant
          user={user}
          selected={selected}
          setShowItems={setShowItems}
        />
      ) : (
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
            {filteredItems.map((item) => (
              <ResultContainer onClick={() => handleItemClick(item)}>
                <NameContainer>
                  <MenuContainer>
                    <BiFoodMenu />
                  </MenuContainer>
                  <ResultName>{item.name}</ResultName>
                </NameContainer>
                <ResultAddress>{item.address}</ResultAddress>
              </ResultContainer>
            ))}
          </RestaurantContainer>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
