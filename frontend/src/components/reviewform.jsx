import {useState,useEffect} from 'react';
import './reviewform.css';
const  ReviewForm=({courseId,onReviewAdded,reviewToEdit,setEditing})=>{
const API = import.meta.env.VITE_API_URL;
const [rating, setRating] = useState(0);
const [comment, setComment] = useState("");
const token = localStorage.getItem("token");
console.log(token);

useEffect(() => {
  if (reviewToEdit) {
    setComment(reviewToEdit.comment);
    setRating(reviewToEdit.rating);
  }
}, [reviewToEdit]);

const submitReview = async () => {
  try {

   const url = reviewToEdit
  ? `${API}/reviews/updateReview/${courseId}`
  : `${API}/reviews/giveReview/${courseId}`;

const method = reviewToEdit ? "PUT" : "POST";

const response = await fetch(url, {
  method,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify({
    rating,
    comment
  })
});

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    // alert(data.message);

    setRating(0);
    setComment("");

    onReviewAdded();
    if (setEditing) {
  setEditing(false);
}

  } catch (error) {
    alert(error.message);
  }
};
    return(
    <>
    <div className="review-form">

  <h2>Write a Review</h2>

  <div className="star-selector">
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className="star"
        onClick={() => setRating(star)}
      >
        {star <= rating ? "★" : "☆"}
      </span>
    ))}
  </div>

  <textarea
    className="comment-input"
    placeholder="Share your experience with this course..."
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    rows={4}
  />

 <button
  className="submit-review-btn"
  onClick={submitReview}
>
  {reviewToEdit ? "Update Review" : "Submit Review"}
</button>

</div>
    </>
    );
}
export default ReviewForm;
