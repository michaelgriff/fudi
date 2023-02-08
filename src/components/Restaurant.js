import React, { useState, useEffect } from "react";
import axios from "axios";
import Item from "./Item";
import {
  MenuItemContainer,
  MenuItemName,
  MenuItemDescription,
  TopContainer,
  TitleContainer,
  HeaderContainer,
  ArrowContainer,
} from "../styles/RestaurantElements";
import {
  RestaurantContainer,
  ResultName,
  ResultAddress,
  NameContainer,
  MenuContainer,
} from "../styles/RestaurantsElements";
import { BiFoodMenu } from "react-icons/bi";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

const Restaurant = ({ user, selected, setShowItems, setLoading }) => {
  const [items, setItems] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [showItem, setShowItem] = useState(false);
  const [item, setItem] = useState({});

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const response = await axios({
        method: "get",
        url: "https://u7px96sqy4.execute-api.us-east-2.amazonaws.com/items",
      });
      const itemList = [];
      response.data.Items.forEach((item) => {
        if (item.parentRestaurant === selected.uuid) {
          itemList.push(item);
        }
      });
      itemList.sort((a, b) => a.uuid - b.uuid);
      return itemList;
    };
    fetch().then((itemList) => {
      setItems(itemList);
      setLoading(false);
    });
  }, []);

  const handleItemClick = (item) => {
    setShowItem(true);
    setItem(item);
  };

  return (
    <div>
      {showItem ? (
        <Item
          user={user}
          item={item}
          setShowItem={setShowItem}
          showReview={showReview}
          setShowReview={setShowReview}
          setLoading={setLoading}
        />
      ) : items ? (
        <RestaurantContainer>
          <HeaderContainer>
            <ArrowContainer onClick={() => setShowItems(false)}>
              <BsFillArrowLeftSquareFill />
            </ArrowContainer>
            <TitleContainer>
              <NameContainer>
                <MenuContainer>
                  <BiFoodMenu />
                </MenuContainer>
                <ResultName>{selected.name}</ResultName>
              </NameContainer>
              <ResultAddress>{selected.address}</ResultAddress>
            </TitleContainer>
          </HeaderContainer>
          {items.map((item) => {
            return (
              <MenuItemContainer onClick={() => handleItemClick(item)}>
                <TopContainer>
                  <MenuItemName>{item.name}</MenuItemName>
                </TopContainer>
                <MenuItemDescription>{item.description}</MenuItemDescription>
              </MenuItemContainer>
            );
          })}
        </RestaurantContainer>
      ) : null}
    </div>
  );
};

export default Restaurant;

{
  /* <p onClick={() => handleItemClick(item)}>{item.name}</p> */
}
{
  /* <p>{item.description}</p> */
}
