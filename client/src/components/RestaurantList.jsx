import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import RestaurantsFinder from "../api/RestaurantsFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import StarRating from "../components/StarRating";
import { toast } from "react-toastify";
const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const history = useHistory();
  useEffect(() => {
    async function fetchData() {
      try {
        const {
          data: {
            data: { restaurants },
          },
        } = await RestaurantsFinder.get("/");
        setRestaurants(restaurants);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [setRestaurants]);
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      // magic from delete
      await RestaurantsFinder.delete(`/${id}`);
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
    } catch (e) {
      console.log(e);
    }
  };
  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  };
  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };
  const renderRating = (res) => {
    if (!res.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={res.id} />
        <span className="text-warning ml-1">({res.count})</span>
      </>
    );
  };
  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Rating</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr
                  key={restaurant.id}
                  onClick={() => handleRestaurantSelect(restaurant.id)}
                >
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>{renderRating(restaurant)}</td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, restaurant.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => {
                        handleDelete(e, restaurant.id);
                        toast.success("restaurant deleted successfully");
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default RestaurantList;
