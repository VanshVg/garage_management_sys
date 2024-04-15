import { body } from "express-validator";

export const serviceValidator = [
  body("serviceId").notEmpty().withMessage('Please select a service'),
  body('price').notEmpty().withMessage("Please provide price")
];