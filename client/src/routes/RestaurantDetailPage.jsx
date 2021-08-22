import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantsFinder from "../api/RestaurantsFinder";

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
        setSelectedRestaurants([...selectedRestaurants, ...restaurant]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [selectedRestaurants, setSelectedRestaurants, id]);
  return <div>RestaurantdetailPage</div>;
};
export default RestaurantDetailPage;
