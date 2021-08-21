import { useState, useContext } from "react";
import RestaurantsFinder from "../api/RestaurantsFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
const AddRestaurant = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  const { addRestaurants } = useContext(RestaurantsContext);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const {
        data: {
          data: { restaurants },
        },
      } = await RestaurantsFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      addRestaurants(restaurants);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="m-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-control"
              placeholder="location"
            />
          </div>
          <div className="col">
            <select
              className="custom-select my-1 mr-sm-2"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddRestaurant;
