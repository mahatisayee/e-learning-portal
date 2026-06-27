import express from 'express';
import auth from '../middleware/auth.js';
import { giveReview, getReviews, deleteReview ,updateReview} from '../controllers/reviewController.js';

const Router=express.Router();

Router.post('/giveReview/:courseId',auth,giveReview);
Router.get('/getReviews/:courseId',getReviews);
Router.delete("/deleteReview/:courseId", auth, deleteReview);
Router.put("/updateReview/:courseId", auth, updateReview);

export default Router;