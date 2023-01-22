import React, { useState, useEffect } from "react";
import axios from "axios";
import Restaurant from "./Restaurant";

const Restaurants = ({ uuid }) => {
  console.log("this is the uuid", uuid);
  const [restList, setRestList] = useState([]);
  const [selected, setSelected] = useState("");
  const [showItems, setShowItems] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios({
        method: "get",
        url: "https://u7px96sqy4.execute-api.us-east-2.amazonaws.com/restaurants",
      });
      console.log(response);
      return response;
    };

    fetch().then((response) => {
      setRestList(response.data.Items);
    });
  }, []);

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
        restList.map((rest) => {
          return <p onClick={() => handleItemClick(rest.uuid)}>{rest.name}</p>;
        })
      )}
    </div>
  );
};

export default Restaurants;
