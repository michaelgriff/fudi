import React, { useState, useEffect } from "react";
import axios from "axios";
import updateReview from "../helpers/updateReview";
import { useNavigate } from "react-router-dom";
import {
  HomeContainer,
  ReviewContainer,
  ReviewHeader,
  ItemName,
  RestaurantName,
  ReviewDescription,
  UserInfo,
  UserName,
  FollowButton,
} from "../styles/HomeElements";

const Home = ({ user }) => {
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
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
      return asyncReviewList;
    };
    fetch().then((reviewList) => {
      setReviews(reviewList);
    });
  }, []);

  const toRestaurant = (restaurant_id) => {
    navigate("/restaurants", { state: { restaurant_id } });
  };

  const toProfile = (user) => {
    navigate(`/profile/${user.username}`, {
      state: { user },
    });
  };

  return (
    <div style={{ height: "100%" }}>
      {/* {reviews
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
        : null} */}

      <HomeContainer>
        {reviews
          ? reviews.map((review) => {
              return (
                <ReviewContainer>
                  <ReviewHeader>
                    <div>
                      <ItemName>{review.item_name}</ItemName>
                      <RestaurantName
                        onClick={() => toRestaurant(review.restaurant_id)}
                      >
                        {review.restaurant_name}
                      </RestaurantName>
                    </div>
                    <p>{review.rating}</p>
                  </ReviewHeader>
                  <ReviewDescription>{review.reasoning}</ReviewDescription>
                  <UserInfo>
                    <UserName onClick={() => toProfile(review.user)}>
                      {review.user.username}
                    </UserName>
                    <FollowButton>Follow</FollowButton>
                  </UserInfo>
                </ReviewContainer>
              );
            })
          : null}
      </HomeContainer>
    </div>
  );
};

export default Home;
