import { body } from "express-validator";

export const registerValidator = () => {
  return [
    body("name")
      .notEmpty()
      .isString()
      .withMessage("name is required"), 
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("invalid email"),
    body("password")
      .isString()
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 10 })
      .withMessage("password must be at least 10 characters long"),
    body("confirmPassword")
      .isString()
      .notEmpty()
      .withMessage("confirm password is required")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("password confirmation does not match password")
  ]
}

export const loginValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("invalid email"),
    body("password")
      .isString()
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 10 })
      .withMessage("password must be at least 10 characters long")
  ]
}