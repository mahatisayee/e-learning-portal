import express from "express";
import {createOrder,verify} from "../controllers/paymentContoller.js";
import auth from "../middleware/auth.js";
const router=express.Router();
router.post("/create-order", auth,createOrder);
router.post("/verify",auth,verify);
export default router;