import { useEffect, useState } from "react";
import ReviewForm from "./reviewform";
import ReviewCard from "./reviewcard";
import './courseReviews.css'

const CourseReviews = ({ courseId }) => {

  const [reviews, setReviews] = useState([]);
  const [editing, setEditing] = useState(false);
  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const myReview = currentUser
    ? reviews.find(
      review => review.user._id === currentUser.id
    )
    : null;
  const getReviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/reviews/getReviews/${courseId}`
      );

      const data = await response.json();

      setReviews(data.reviews);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getReview = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/reviews/getReviews/${courseId}`
        );

        const val = await res.json();

        setReviews(val.reviews);
      } catch (err) {
        console.log(err);
      }
    };

    getReview();

  }, [courseId]);
  //   console.log("Current User:", currentUser);
  // console.log("Reviews:", reviews);
  // console.log("My Review:", myReview);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch(
        `http://localhost:5000/reviews/deleteReview/${courseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      getReviews();

    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="review-section">

      <h2 className="review-title">
        Student Reviews
      </h2>

      {(!myReview || editing) ? (
        <ReviewForm
          courseId={courseId}
          onReviewAdded={getReviews}
          reviewToEdit={myReview}
          setEditing={setEditing}
        />
      ) : (
        <div className="review-actions-box">
          <p className="review-status">
            You have already reviewed this course.
          </p>

          <div className="review-buttons">
            <button
              className="edit-review-btn"
              onClick={() => setEditing(true)}
            // onClick={handleEdit}
            >
              Edit Review
            </button>

            <button
              className="delete-review-btn"
              onClick={handleDelete}
            >
              Delete Review
            </button>
          </div>
        </div>
      )}

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">
            No reviews yet. Be the first to review this course!
          </p>
        ) : (
          reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              getReviews={getReviews}
            />
          ))
        )}
      </div>

    </div>
  );
};

export default CourseReviews;