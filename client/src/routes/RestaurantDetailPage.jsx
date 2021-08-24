import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantsFinder from "../api/RestaurantsFinder";
import Reviews from "../components/Reviews";
import AddReviews from "../components/AddReviews";
import StarRating from "../components/StarRating";
const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurants, setSelectedRestaurants } =
    useContext(RestaurantsContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { data },
        } = await RestaurantsFinder.get(`/${id}`);

        setSelectedRestaurants(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [setSelectedRestaurants, id]);

  return (
    <div>
      {selectedRestaurants && (
        <>
          <h1 className="text-center display-1">
            {selectedRestaurants.restaurant.name}
          </h1>
          <div className="text-center">
            <StarRating
              rating={selectedRestaurants.restaurant.average_rating}
            />
            <span className="text-warning ml-1">
              {selectedRestaurants.restaurant.count
                ? `(${selectedRestaurants.restaurant.count})`
                : "(0)"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviewsData={selectedRestaurants} />
          </div>
          <AddReviews />
        </>
      )}
    </div>
  );
};
export default RestaurantDetailPage;
