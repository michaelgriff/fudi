import React, { useState, useEffect } from "react";
import axios from "axios";
import Restaurant from "./Restaurant";
import { useLocation } from "react-router-dom";

const Restaurants = ({ uuid }) => {
  const [restList, setRestList] = useState([]);
  const [selected, setSelected] = useState("");
  const [showItems, setShowItems] = useState(false);
  const [query, setQuery] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      console.log(location.state);
      setSelected(location.state.restaurant_id);
      setShowItems(true);
    }
  }, [location.state]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios({
        method: "get",
        url: "https://u7px96sqy4.execute-api.us-east-2.amazonaws.com/restaurants",
      });
      return response;
    };

    fetch().then((response) => {
      setRestList(response.data.Items);
    });
  }, []);

  const filteredItems = restList
    ? restList.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    : null;

  const handleItemClick = (uuid) => {
    setSelected(uuid);
    setShowItems(true);
  };

  return (
    <div>
      {showItems ? (
        <Restaurant
          uuid={uuid}
          selected={selected}
          setShowItems={setShowItems}
        />
      ) : (
        <div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
          />
          <ul>
            {filteredItems.map((item) => (
              <li onClick={() => handleItemClick(item.uuid)}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
