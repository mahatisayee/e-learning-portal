import express from "express";
import {login,register,profile} from "../controllers/authControllers.js";
import auth from "../middleware/auth.js";
import {registerValidation,loginValidation} from "../middleware/validators/authvalidators.js";
import validate from "../middleware/validators/validate.js";
const router=express.Router();

router.post("/register",registerValidation,validate,register);
router.post("/login",loginValidation,validate,login);
router.get("/profile",auth,profile);

export default router;