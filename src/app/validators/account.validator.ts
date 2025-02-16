import { body } from "express-validator";

export const updateProfileValidator = () => {
  return [
    body("name")
      .optional()
      .isString()
      .withMessage("Name is required"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Invalid email"),
  ]
}

export const updatePasswordValidator = () => {
  return [
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