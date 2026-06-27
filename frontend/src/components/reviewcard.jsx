import './reviewcard.css'
const ReviewCard =({review,})=>{
  return (
    <>
      <div  className="review-card">
              <div className="review-header">
                <div className="avatar">{review.user?.name?.[0]?.toUpperCase() || "U"}</div>

                <div className="review-info">
                  <div className="top-row">
                    <h3 className="username">{review.user?.name || "Unknown User"}</h3>

                    <div className="rating">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                  </div>

                  <p className="date">
                    {new Date(review.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}</p>
                </div>
              </div>

              <p className="comment">
                {review.comment}
              </p>
       </div>
    </>
  );
}
export default ReviewCard;