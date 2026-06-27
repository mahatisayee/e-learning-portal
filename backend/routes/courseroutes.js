import express from "express";
import {createCourse,getCourses,getCourse,updateCourse,deleteCourse} from "../controllers/courseControllers.js";
import auth from "../middleware/auth.js";
import adminOnly from "../middleware/adminOnly.js";
const router = express.Router();
import courseValidation from "../middleware/validators/coursevalidators.js";
import  validate  from "../middleware/validators/validate.js";

router.post("/createCourse",auth,adminOnly, courseValidation,validate, createCourse);
router.get("/getCourses",getCourses);
router.get("/getCourse/:id",getCourse);
router.put("/updateCourse/:id",auth,adminOnly, courseValidation,validate, updateCourse);
router.delete("/deleteCourse/:id",auth,adminOnly, deleteCourse);


export default router;