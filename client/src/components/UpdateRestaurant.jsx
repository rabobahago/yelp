import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantsFinder from "../api/RestaurantsFinder";

const UpdateRestaurant = (props) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  //const { restaurants } = useContext(RestaurantsContext);
  const { id } = useParams();
  useEffect(() => {
    const fetchDat = async () => {
      try {
        const {
          data: {
            data: {
              restaurant: [resData],
            },
          },
        } = await RestaurantsFinder.get(`/${id}`);

        setName(resData.name);
        setLocation(resData.location);
        setPriceRange(resData.price_range);
      } catch (e) {
        console.log(e);
      }
    };
    fetchDat();
  }, [id]);
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
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default UpdateRestaurant;
