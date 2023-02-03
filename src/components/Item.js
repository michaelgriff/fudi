import React, { useState, useEffect } from "react";
import axios from "axios";
import updateReview from "../helpers/updateReview";
import Review from "./Review";
import FollowButton from "./FollowButton";
import { useNavigate } from "react-router-dom";
import {
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
} from "../styles/HomeElements";
import { FaStar } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";
import { BsFillArrowLeftSquareFill, BsFillPencilFill } from "react-icons/bs";
import styled from "styled-components";

const ReviewButton = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 7px 20px;
  border-radius: 5px;
  border: none;
  background-color: #9c1010;
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-top: -10px;
  margin-bottom: 10px;
  cursor: pointer;

  :hover {
    background-color: #630e0e;
    transition: ease-in-out 0.2s;
  }
`;

const PencilWrapper = styled.div`
  padding-right: 18px;
  padding-top: 2px;
`;

const Item = ({ user, item, setShowItem, showReview, setShowReview }) => {
  const [reviews, setReviews] = useState([]);
  const [noReviews, setNoReviews] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios({
        method: "get",
        url: "https://u7px96sqy4.execute-api.us-east-2.amazonaws.com/reviews",
      });
      const reviewList = [];
      response.data.Items.forEach((review) => {
        if (review.item === item.uuid) {
          reviewList.push(review);
        }
      });

      const asyncReviewList = await Promise.all(
        reviewList.map((review) => updateReview(review))
      );
      return asyncReviewList;
    };
    fetch().then((asyncReviewList) => {
      if (!asyncReviewList.length) {
        setNoReviews(true);
      }
      setReviews(asyncReviewList);
    });
  }, []);

  const handleReviewClick = () => {
    setShowReview(true);
  };

  const toProfile = (user) => {
    navigate(`/profile/${user.username}`, {
      state: { user },
    });
  };

  return (
    <div>
      <RestaurantContainer>
        {reviews.length || noReviews ? (
          <HeaderContainer>
            {showReview ? (
              <ArrowContainer onClick={() => setShowReview(false)}>
                <BsFillArrowLeftSquareFill />
              </ArrowContainer>
            ) : (
              <ArrowContainer onClick={() => setShowItem(false)}>
                <BsFillArrowLeftSquareFill />
              </ArrowContainer>
            )}
            <TitleContainer>
              <NameContainer>
                <MenuContainer>
                  <BiFoodMenu />
                </MenuContainer>
                <ResultName>{item.name}</ResultName>
              </NameContainer>
              {!noReviews ? (
                <ResultAddress>{reviews[0].restaurant_name}</ResultAddress>
              ) : null}
            </TitleContainer>
          </HeaderContainer>
        ) : null}

        {showReview ? null : (
          <ReviewButton onClick={() => handleReviewClick()}>
            <PencilWrapper>
              <BsFillPencilFill />
            </PencilWrapper>
            Write a review
          </ReviewButton>
        )}

        {showReview ? (
          <Review uuid={user.uuid} reviewing={item} />
        ) : (
          reviews.map((review) => {
            return (
              <ReviewContainer>
                <ReviewHeader>
                  <div>
                    <ItemName>{review.item_name}</ItemName>
                    <RestaurantName>{review.restaurant_name}</RestaurantName>
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
                  {review.user.uuid === user.uuid ? null : (
                    <FollowButton user={user} selected={review.user} />
                  )}
                </UserInfo>
              </ReviewContainer>
            );
          })
        )}
      </RestaurantContainer>
    </div>
  );
};

export default Item;
