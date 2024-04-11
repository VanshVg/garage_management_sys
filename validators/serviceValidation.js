import { body } from "express-validator";

export const serviceValidator = [
  body("name").notEmpty().withMessage('Please provide service name'),
];