import React, { useState, createContext } from "react";

export const RestaurantsContext = createContext();

const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const addRestaurants = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };
  return (
    <RestaurantsContext.Provider
      value={{ restaurants, setRestaurants, addRestaurants }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};
export default RestaurantsContextProvider;
