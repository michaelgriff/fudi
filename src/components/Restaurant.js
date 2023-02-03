import React, { useState, useEffect } from "react";
import axios from "axios";
import Item from "./Item";
import {
  MenuItemContainer,
  MenuItemName,
  MenuItemDescription,
  TopContainer,
  TitleContainer,
} from "../styles/RestaurantElements";
import {
  RestaurantContainer,
  ResultName,
  ResultAddress,
  NameContainer,
  MenuContainer,
} from "../styles/RestaurantsElements";
import { BiFoodMenu } from "react-icons/bi";

const Restaurant = ({ uuid, selected, setShowItems }) => {
  const [items, setItems] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [showItem, setShowItem] = useState(false);
  const [item, setItem] = useState({});

  useEffect(() => {
    const fetch = async () => {
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
    });
  }, []);

  const handleItemClick = (item) => {
    setShowItem(true);
    setItem(item);
  };

  return (
    <div>
      {!showItem ? (
        <button onClick={() => setShowItems(false)}>Back</button>
      ) : !showReview ? (
        <button onClick={() => setShowItem(false)}>Back</button>
      ) : (
        <button onClick={() => setShowReview(false)}>Back</button>
      )}

      {showItem ? (
        <Item
          uuid={uuid}
          item={item}
          setShowItem={setShowItem}
          showReview={showReview}
          setShowReview={setShowReview}
        />
      ) : items ? (
        <RestaurantContainer>
          <TitleContainer>
            <NameContainer>
              <MenuContainer>
                <BiFoodMenu />
              </MenuContainer>
              <ResultName>{selected.name}</ResultName>
            </NameContainer>
            <ResultAddress>{selected.address}</ResultAddress>
          </TitleContainer>
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
