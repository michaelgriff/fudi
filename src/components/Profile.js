import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Profile = ({ user }) => {
  const [reviews, setReviews] = useState([]);

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setSelected(location.state.restaurant_id);
      setShowItems(true);
    }
  }, [location.state]);

  useEffect(() => {
    const fetch = async () => {
      const reviews = await axios({
        method: "get",
        url: "https://u7px96sqy4.execute-api.us-east-2.amazonaws.com/reviews",
      });

      const items = await axios({
        method: "get",
        url: "https://u7px96sqy4.execute-api.us-east-2.amazonaws.com/items",
      });

      const itemList = items.data.Items.sort((a, b) => a.uuid - b.uuid);

      const reviewList = [];

      for (let i = 0; i < reviews.data.Items.length; i++) {
        if (reviews.data.Items[i].user === user.uuid) {
          reviews.data.Items[i].item_name =
            itemList[reviews.data.Items[i].item - 1].name;
          reviewList.push(reviews.data.Items[i]);
        }
      }

      return reviewList;
    };
    fetch().then((reviewList) => {
      setReviews(reviewList);
    });
  }, [user]);
  return (
    <div>
      <p>{user.username}</p>
      {reviews.map((review) => {
        return (
          <div>
            <p>{review.item_name}</p>
            <p>{review.rating}</p>
            <p>{review.reasoning}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
