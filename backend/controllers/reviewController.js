import Review from '../models/review.js';
import Course from '../models/courses.js';
import Enrollment from '../models/enrollment.js';
import mongoose from 'mongoose';
async function updateCourseRatings(courseId) {
  const stats = await Review.aggregate([
    {
      $match: {
        course: new mongoose.Types.ObjectId(courseId)
      }
    },
    {
      $group: {
        _id: null,
        reviewCount: { $sum: 1 },
        averageRating: { $avg: "$rating" }
      }
    }
  ]);
  console.log(stats);

  const averageRating =
    stats.length > 0
      ? Number(stats[0].averageRating.toFixed(1))
      : 0;

  await Course.findByIdAndUpdate(courseId, {
  averageRating,
  reviewCount: stats.length > 0 ? stats[0].reviewCount : 0
});
}


export const giveReview = async (req, res) => {
    try{
       const course = await Course.findById(req.params.courseId);

    if(!course){
    return res.status(404).json({
        message: "Course not found"
    });
    }
    const enrollment = await Enrollment.findOne({
        user: req.user.id,
        course: req.params.courseId
    });

    if (!enrollment) {
        return res.status(403).json({
            message: "Enroll in the course before reviewing"
        });
    }

   const existing = await Review.findOne({
    course: req.params.courseId,
    user: req.user.id
    });
    if (existing) {
        return res.status(400).json( {
            success: false,
        message: "You have already given a review for this course"
    });
    }
    if (req.body.rating < 1 || req.body.rating > 5) {
    return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5"
    });
}
    const review = await Review.create({
        course: req.params.courseId,
        user: req.user.id,
        rating: req.body.rating,
        comment: req.body.comment
    });
    await updateCourseRatings(req.params.courseId);
    res.status(201).json({
    success: true,
    message: "Review added successfully",
    review
    });
    }catch(error)  {
    res.status(500).json({
        message: error.message
    });
  }
   
};


export const deleteReview = async (req, res) => {
    try {

        const review = await Review.findOneAndDelete({
            course: req.params.courseId,
            user: req.user.id
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        await updateCourseRatings(req.params.courseId);

        res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateReview = async (req, res) => {
    try {
        if (req.body.rating < 1 || req.body.rating > 5) {
        return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5"
    });
}
        const review = await Review.findOne({
            course: req.params.courseId,
            user: req.user.id
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        review.rating = req.body.rating;
        review.comment = req.body.comment;

        await review.save();

        await updateCourseRatings(req.params.courseId);

        res.status(200).json({
            success: true,
            message: "Review updated successfully",
            review
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const getReviews = async (req,res)=>{
    try{
        const reviews = await Review.find({
            course: req.params.courseId
        }).populate("user","name").sort({ createdAt: -1 });;

        res.status(200).json({
            success:true,
            reviews
        });
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
}