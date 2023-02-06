import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import updateReview from "../helpers/updateReview";
import FollowButton from "../components/FollowButton";
import {
  Container,
  IconContainer,
  InfoContainer,
  Info,
  Title,
  Number,
  LeftContainer,
  StyledButtonGrey,
  Username,
} from "../styles/ProfileElements";
import {
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
import { RestaurantContainer } from "../styles/RestaurantsElements";
import { BiUserCircle } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

const Profile = ({ user, setUser }) => {
  const currentUserString = localStorage.getItem("currentUser");
  const [reviews, setReviews] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    currentUserString ? JSON.parse(currentUserString) : ""
  );

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      setCurrentUser(location.state.user);
    }
  }, [location.state]);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    const fetch = async () => {
      const reviews = await axios({
        method: "get",
        url: "https://u7px96sqy4.execute-api.us-east-2.amazonaws.com/reviews",
      });

      const reviewList = reviews.data.Items.filter(
        (review) => review.user === currentUser.uuid
      );

      const asyncReviewList = await Promise.all(
        reviewList.map((review) => updateReview(review))
      );
      return asyncReviewList;
    };

    fetch().then((asyncReviewList) => {
      setReviews(asyncReviewList);
    });
  }, [currentUser]);

  const toRestaurant = (restaurant_id) => {
    navigate("/restaurants", { state: { restaurant_id } });
  };

  const logout = () => {
    setUser();
    navigate("/login");
  };

  return (
    <RestaurantContainer>
      <Container>
        <LeftContainer>
          <IconContainer>
            <BiUserCircle />
          </IconContainer>
          <Username>{currentUser.username}</Username>
        </LeftContainer>
        <InfoContainer>
          <Info>
            <Title>Reviews</Title>
            <Number>{reviews ? reviews.length : null}</Number>
          </Info>
          <Info>
            <Title>Following</Title>
            <Number>
              {currentUser.following
                ? JSON.parse(currentUser.following).length
                : null}
            </Number>
          </Info>
          {currentUser.uuid ? (
            user.uuid === currentUser.uuid ? (
              <StyledButtonGrey onClick={logout}>Log out</StyledButtonGrey>
            ) : (
              <FollowButton user={user} selected={currentUser} />
            )
          ) : null}
        </InfoContainer>
      </Container>
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
                <UserName>{review.user.username}</UserName>
              </UserInfo>
            </ReviewContainer>
          );
        })
      ) : currentUser.uuid ? (
        user.uuid === currentUser.uuid ? (
          <MessageContainer>
            No reviews yet. Visit the Restaurants page to review some food.
          </MessageContainer>
        ) : (
          <MessageContainer>No reviews yet.</MessageContainer>
        )
      ) : null}
    </RestaurantContainer>
  );
};

export default Profile;
