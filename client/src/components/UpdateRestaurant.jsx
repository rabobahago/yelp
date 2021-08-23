import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import RestaurantsFinder from "../api/RestaurantsFinder";

const UpdateRestaurant = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: {
            data: { restaurant },
          },
        } = await RestaurantsFinder.get(`/${id}`);
        setName(restaurant.name);
        setLocation(restaurant.location);
        setPriceRange(restaurant.price_range);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id]);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await RestaurantsFinder.put(`/${id}`, {
        name,
        location,
        price_range: priceRange,
      });
      history.push("/");
    } catch (er) {
      console.log(er);
    }
  };
  return (
    <form action="">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          type="text"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          id="location"
          type="text"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price_range">Price Range</label>
        <input
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          id="price_range"
          type="number"
          className="form-control"
        />
      </div>
      <button type="submit" onClick={handleUpdate} className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default UpdateRestaurant;
