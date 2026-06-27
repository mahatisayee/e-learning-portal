import { body } from "express-validator";

 const courseValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("price")
    .isNumeric()
    .withMessage("Price must be a number")
];
export default courseValidation;