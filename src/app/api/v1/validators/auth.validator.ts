import { body } from "express-validator";

export const registerValidator = () => {
  return [
    body("name")
      .notEmpty()
      .isString()
      .withMessage("Name is required"), 
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email"),
    body("password")
      .isString()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 10 })
      .withMessage("Password must be at least 10 characters long"),
    body("confirmPassword")
      .isString()
      .notEmpty()
      .withMessage("Confirm password is required")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Password confirmation does not match password")
  ]
}

export const loginValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email"),
    body("password")
      .isString()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 10 })
      .withMessage("Password must be at least 10 characters long")
  ]
}