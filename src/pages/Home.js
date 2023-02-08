import React, { useState, useEffect } from "react";
import axios from "axios";
import updateReview from "../helpers/updateReview";
import { useNavigate } from "react-router-dom";
import FollowButton from "../components/FollowButton";
import {
  HomeContainer,
  ReviewContainer,
  ReviewHeader,
  ItemName,
  RestaurantName,
  ReviewDescription,
  UserInfo,
  UserName,
  Rating,
  RatingContainer,
  StarContainer,
  MessageContainer,
} from "../styles/HomeElements";
import { FaStar } from "react-icons/fa";

const Home = ({ user, setLoading }) => {
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
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
      setLoading(false);
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
      <HomeContainer>
        {reviews.length ? (
          reviews.map((review) => {
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
                  <RatingContainer>
                    <Rating>{review.rating}</Rating>
                    <StarContainer>
                      <FaStar />
                    </StarContainer>
                  </RatingContainer>
                </ReviewHeader>
                <ReviewDescription>{review.reasoning}</ReviewDescription>
                <UserInfo>
                  <UserName onClick={() => toProfile(review.user)}>
                    {review.user.username}
                  </UserName>
                  <FollowButton user={user} selected={review.user} />
                </UserInfo>
              </ReviewContainer>
            );
          })
        ) : (
          <MessageContainer>
            No reviews yet. Follow other users to see what they're eating.
          </MessageContainer>
        )}
      </HomeContainer>
    </div>
  );
};

export default Home;
