import express from "express";
import {enroll,getMyCourses,checkenrollment} from "../controllers/enrollmentControllers.js";
import auth from "../middleware/auth.js";
const router=express.Router();
router.post("/enroll/:courseId",auth,enroll);
router.get("/myCourses",auth,getMyCourses);
router.get("/checkenrollment/:id",auth,checkenrollment);

export default router;