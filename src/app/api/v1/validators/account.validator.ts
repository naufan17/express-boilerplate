import { body } from "express-validator";

export const updateProfileValidator = () => {
  return [
    body("name")
      .optional()
      .isString()
      .withMessage("invalid name"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("invalid email"),
    body("phoneNumber")
      .optional()
      .isString()
      .withMessage("invalid phone")
      .matches(/^08\d{8,12}$/)
      .withMessage("phone number must start with 08 and be a valid format"),
    body("address")
      .optional()
      .isString()
      .withMessage("invalid address"),
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