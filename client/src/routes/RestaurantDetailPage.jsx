import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantsFinder from "../api/RestaurantsFinder";
import Reviews from "../components/Reviews";
import AddReviews from "../components/AddReviews";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurants, setSelectedRestaurants } =
    useContext(RestaurantsContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: {
            data: { restaurant },
          },
        } = await RestaurantsFinder.get(`/${id}`);
        setSelectedRestaurants(restaurant);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {selectedRestaurants && (
        <>
          <div className="mt-3">
            <Reviews />
            <AddReviews />
          </div>
        </>
      )}
    </div>
  );
};
export default RestaurantDetailPage;
