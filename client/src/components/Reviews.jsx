import StarRating from "./StarRating";
const Reviews = ({ reviewsData }) => {
  const { reviews } = reviewsData;
  return (
    <div className="row row-col-3 mb-2">
      {reviews.map((review) => {
        return (
          <div
            className="card text-white bg-primary mb-3 mr-4"
            style={{ maxWidtth: "30%" }}
            key={review.id}
          >
            <div className="card-header d-flex justify-content-between">
              <span>{review.name}</span>
              <span>
                <StarRating rating={review.rating} />
              </span>
            </div>
            <div className="card-body">
              <p>{review.review}</p>
            </div>
          </div>
        );
      })}
      {/* <div
        className="card text-white bg-primary mb-3 mr-4"
        style={{ maxWidtth: "30%" }}
      >
        <div className="card-header d-flex justify-content-between">
          <span>Rabo</span>
          <span>
            <StarRating rating={4} />
          </span>
        </div>
        <div className="card-body">
          <p>This restaurant is awesome!</p>
        </div>
      </div>

      <div
        className="card text-white bg-primary mb-3 mr-4"
        style={{ maxWidtth: "30%" }}
      >
        <div className="card-header d-flex justify-content-between">
          <span>Rabo</span>
          <span>
            <StarRating rating={4} />
          </span>
        </div>
        <div className="card-body">
          <p>This restaurant is awesome!</p>
        </div>
      </div>

      <div
        className="card text-white bg-primary mb-3 mr-4"
        style={{ maxWidtth: "30%" }}
      >
        <div className="card-header d-flex justify-content-between">
          <span>Rabo</span>
          <span>
            <StarRating rating={4} />
          </span>
        </div>
        <div className="card-body">
          <p>This restaurant is awesome!</p>
        </div>
      </div>
      <div
        className="card text-white bg-primary mb-3 mr-4"
        style={{ maxWidtth: "30%" }}
      >
        <div className="card-header d-flex justify-content-between">
          <span>Rabo</span>
          <span>
            <StarRating rating={4} />
          </span>
        </div>
        <div className="card-body">
          <p>This restaurant is awesome!</p>
        </div>
      </div> */}
    </div>
  );
};
export default Reviews;
