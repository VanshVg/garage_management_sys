import express from "express";
import * as vehicleController from "../controllers/vehicleControllers.js";
import { vehicleValidator } from "../validators/vehicleValidation.js";
import {
  customerHome,
  customerProfile,
} from "../controllers/staticControllers.js";
const router = express.Router();

router.get("/addVehicle", vehicleController.getAddVehicle);
router.post("/addVehicle", vehicleValidator, vehicleController.addVehicle);
router.get("/home", customerHome);

router.get("/profile", customerProfile);

export default router;
