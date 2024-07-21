import { FaStar } from "react-icons/fa";
import { useState } from "react";
import apiService from "../apiService";
import { MdDelete } from "react-icons/md";
import styles from "./AudioBookDetails.module.css";

function AudioBookDetails({ audioBook }) {
  const [hover, setHover] = useState(0);
  const [score, setScore] = useState(0);
  const [review, setReviewText] = useState("");
  const [rating, setRating] = useState(
    Array.isArray(audioBook.rating) ? audioBook.rating : []
  );

  const handleScoreChange = (rate) => {
    setScore(rate);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newReview = { score, review };
    try {
      const updatedRating = await apiService.addReview(audioBook.id, newReview);
      setRating([newReview, ...rating]);
      setReviewText("");
      setScore(0);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  // const handleDeleteReview = async (reviewIndex) => {
  //   try {
  //     const updatedRating = await apiService.deleteReview(
  //       audioBook.id,
  //       reviewIndex
  //     );
  //     setRating(updatedRating);
  //   } catch (error) {
  //     console.error("Error deleting review:", error);
  //   }
  // };

  return (
    <div className={styles.container}>
      <div className="col-lg-12 px-0">
        <h1 className="display-5 fst-italic w-100">{audioBook.title}</h1>
        <h4 className="display-7 fst-italic w-100">{audioBook.genre}</h4>
        <p className="lead my-3 w-100">{audioBook.description}</p>

        <div className={`card p-3 mb-4 ${styles.card}`}>
          <form className="w-100" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className={`form-control w-100 ${styles.inputReview}`}
                placeholder="Enter Your Review"
                value={review}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </div>
            <div className="mb-3 d-flex align-items-center">
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="score"
                      style={{ display: "none" }}
                      onClick={() => handleScoreChange(ratingValue)}
                    />
                    <FaStar
                      size={30}
                      color={
                        ratingValue <= (hover || score) ? "#ffc107" : "#4a4a4a"
                      }
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                      style={{ cursor: "pointer" }}
                    />
                  </label>
                );
              })}
            </div>
            <button
              type="submit"
              className={`btn btn-primary ${styles.btnSubmit}`}
            >
              Submit
            </button>
          </form>
        </div>

        <div className="mt-4 w-100">
          <h3 className="display-7 fst-italic w-100">Reviews</h3>
          {Array.isArray(rating) && rating.length > 0 ? (
            <ul className="list-group w-100">
              {rating.map((reviewItem, index) => (
                <li key={index} className={styles.listGroupItem}>
                  <div className={styles.reviewContent}>
                    <p className={`${styles.reviewText} ${styles.reviewTitle}`}>
                      <strong>Review:</strong> {reviewItem.review}
                    </p>
                  </div>
                  <div className={styles.reviewScore}>
                    <div className={styles.starContainer}>
                      {[...Array(5)].map((star, i) => (
                        <FaStar
                          key={i}
                          size={20}
                          color={i < reviewItem.score ? "#ffc107" : "#4a4a4a"}
                        />
                      ))}
                    </div>
                    {/* <MdDelete
                      size={20}
                      className={styles.deleteIcon}
                      onClick={() => handleDeleteReview(index)}
                    /> */}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AudioBookDetails;
