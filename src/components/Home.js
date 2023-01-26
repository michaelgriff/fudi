import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ user }) => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getItemName = async (id) => {
      const response = await axios({
        method: "get",
        url: `https://u7px96sqy4.execute-api.us-east-2.amazonaws.com/items/${id}`,
      });

      return {
        item_name: response.data.Item.name,
        restaurant_id: response.data.Item.parentRestaurant,
      };
    };

    const getRestaurantName = async (id) => {
      const response = await axios({
        method: "get",
        url: `https://u7px96sqy4.execute-api.us-east-2.amazonaws.com/restaurants/${id}`,
      });

      return response.data.Item.name;
    };

    const getUser = async (id) => {
      const response = await axios({
        method: "get",
        url: `https://u7px96sqy4.execute-api.us-east-2.amazonaws.com/users/${id}`,
      });

      return response.data.Item.username;
    };

    const updateReview = async (review) => {
      const { item_name, restaurant_id } = await getItemName(review.item);
      const restaurant_name = await getRestaurantName(restaurant_id);
      const username = await getUser(review.user);

      review.item_name = item_name;
      review.restaurant_name = restaurant_name;
      review.username = username;
      return review;
    };

    const fetch = async () => {
      const allReviews = await axios({
        method: "get",
        url: "https://u7px96sqy4.execute-api.us-east-2.amazonaws.com/reviews",
      });

      const reviewList = allReviews.data.Items.filter((review) =>
        JSON.parse(user.following).includes(review.user)
      );

      const asyncReviewList = await Promise.all(
        reviewList.map((review) => updateReview(review))
      );
      console.log(asyncReviewList);
      return reviewList;
    };
    fetch().then((reviewList) => {
      setReviews(reviewList);
    });
  }, []);

  return (
    <div>
      {reviews
        ? reviews.map((review) => {
            return (
              <div>
                <p>{review.username}</p>
                <p>{review.item_name}</p>
                <p>{review.restaurant_name}</p>
                <p>{review.rating}</p>
                <p>{review.reasoning}</p>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Home;
