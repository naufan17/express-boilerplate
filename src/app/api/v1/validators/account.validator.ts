import { body } from "express-validator";

export const updateProfileValidator = () => {
  return [
    body("name")
      .optional()
      .isString()
      .withMessage("name is required"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("invalid email"),
  ]
}

export const updatePasswordValidator = () => {
  return [
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