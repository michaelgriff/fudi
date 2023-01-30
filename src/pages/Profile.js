import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import updateReview from "../helpers/updateReview";
import FollowButton from "../components/FollowButton";

const Profile = ({ user }) => {
  const [reviews, setReviews] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      setCurrentUser(location.state.user);
    }
  }, [location.state]);

  useEffect(() => {
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

  return (
    <div>
      {currentUser.uuid ? (
        user.uuid === currentUser.uuid ? (
          <button>Settings</button>
        ) : (
          <FollowButton user={user} selected={currentUser} />
        )
      ) : null}
      <p>{currentUser.username}</p>
      {reviews.map((review) => {
        return (
          <div>
            <p onClick={() => toRestaurant(review.restaurant_id)}>
              {review.restaurant_name}
            </p>
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
