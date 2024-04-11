import express from "express";
import { serviceValidator } from "../validators/serviceValidation.js";
import * as serviceController from "../controllers/serviceControllers.js";

const router = express.Router();

router.post("/:garageId", serviceValidator, serviceController.addService);

export default router;
