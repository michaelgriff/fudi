import axios from "axios";

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

export default updateReview;
