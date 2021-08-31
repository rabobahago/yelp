import { useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import RestaurantsFinder from "../api/RestaurantsFinder";
const AddReviews = () => {
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("rating");
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await RestaurantsFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });
      history.push("/");
      history.push(location.pathname);
      toast.success("Review added successfully");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="mb-2">
      <form action="">
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Name"
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              className="custom-select"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="reviews">Reviews</label>
          <textarea
            id="reviews"
            className="form-control"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
        </div>

        <button onClick={handleSubmitReview} className="btn btn-primary">
          submit
        </button>
      </form>
    </div>
  );
};

export default AddReviews;
