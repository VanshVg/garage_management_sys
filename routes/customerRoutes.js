import express from "express";
import { customerHome } from "../controllers/staticControllers.js";
import * as vehicleController from "../controllers/vehicleControllers.js";
import { vehicleValidator } from "../validators/vehicleValidation.js";

const router = express.Router();

router.get("/home", customerHome);
router.post("/addVehicle", vehicleValidator, vehicleController.addVehicle);

export default router;
