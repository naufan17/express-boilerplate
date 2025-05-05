import { body } from "express-validator";

export const updateProfileValidator = () => {
  return [
    body("name")
      .optional()
      .isString()
      .withMessage("Invalid name"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Invalid email"),
    body("phoneNumber")
      .optional()
      .isString()
      .withMessage("Invalid phone")
      .matches(/^08\d{8,12}$/)
      .withMessage("Phone number must start with 08 and be a valid format"),
    body("address")
      .optional()
      .isString()
      .withMessage("Invalid address"),
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