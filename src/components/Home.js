import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = ({ user }) => {
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

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

      return response.data.Item;
    };

    const updateReview = async (review) => {
      const { item_name, restaurant_id } = await getItemName(review.item);
      const restaurant_name = await getRestaurantName(restaurant_id);
      const user = await getUser(review.user);

      review.item_name = item_name;
      review.restaurant_id = restaurant_id;
      review.restaurant_name = restaurant_name;
      review.user = user;
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

  const toRestaurant = (restaurant_id) => {
    navigate("/restaurants", { state: { restaurant_id } });
  };

  const toProfile = (user) => {
    navigate("/profile", { state: { user } });
  };

  return (
    <div>
      {reviews
        ? reviews.map((review) => {
            return (
              <div>
                <p onClick={() => toProfile(review.user)}>
                  {review.user.username}
                </p>
                <p>{review.item_name}</p>
                <p onClick={() => toRestaurant(review.restaurant_id)}>
                  {review.restaurant_name}
                </p>
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
