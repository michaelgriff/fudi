import React, { useState, useEffect } from "react";
import axios from "axios";
import Review from "./Review";

const Restaurant = ({ uuid, selected, setShowItems }) => {
  const [items, setItems] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [reviewing, setReviewing] = useState({});
  useEffect(() => {
    const fetch = async () => {
      const response = await axios({
        method: "get",
        url: "https://u7px96sqy4.execute-api.us-east-2.amazonaws.com/items",
      });
      const itemList = [];
      response.data.Items.forEach((item) => {
        if (item.parentRestaurant === selected) {
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

  const handleReviewClick = (item) => {
    setShowReview(true);
    setReviewing(item);
  };

  return (
    <div>
      {!showReview ? (
        <button onClick={() => setShowItems(false)}>Back</button>
      ) : (
        <button onClick={() => setShowReview(false)}>Back</button>
      )}

      {showReview ? (
        <Review
          uuid={uuid}
          reviewing={reviewing}
          setShowReview={setShowReview}
        />
      ) : items ? (
        items.map((item) => {
          return (
            <div>
              <p>{item.name}</p>
              <p>{item.description}</p>
              <button onClick={() => handleReviewClick(item)}>Review</button>
            </div>
          );
        })
      ) : null}
    </div>
  );
};

export default Restaurant;
