import React, { useState, useEffect } from "react";
import axios from "axios";
import updateReview from "../helpers/updateReview";
import Review from "./Review";

const Item = ({ uuid, item, showReview, setShowReview }) => {
  const [reviews, setReviews] = useState([]);
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
      setReviews(asyncReviewList);
    });
  }, []);

  const handleReviewClick = () => {
    setShowReview(true);
  };

  return (
    <div>
      <p>{item.name}</p>
      <p>{item.description}</p>
      {showReview ? null : (
        <button onClick={() => handleReviewClick()}>Write a review...</button>
      )}

      {showReview ? (
        <Review uuid={uuid} reviewing={item} />
      ) : (
        reviews.map((review) => {
          return (
            <div>
              <p>{review.user.username}</p>
              <p>{review.rating}</p>
              <p>{review.reasoning}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Item;
