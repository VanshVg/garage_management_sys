import { body } from "express-validator";

export const registerValidator = [
  body("name").isAlpha().withMessage("Only alphabets allowed..!!"),
  body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 character..!!"),
  body("email").isEmail().withMessage("Invalid email...!!").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 character long...!!"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Invalid email...!!").normalizeEmail(),
  body("password").isLength({ min: 8 }).withMessage("Invalid password...!!"),
];
export const forgotPasswordValidator = () => { };
export const forgotEmailValidator = () => { };