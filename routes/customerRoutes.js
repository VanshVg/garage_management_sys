import express from "express";
import {
  customerHome,
  servicesListing,
  customerProfile,
} from "../controllers/staticControllers.js";
import * as vehicleController from "../controllers/vehicleControllers.js";
import { vehicleValidator } from "../validators/vehicleValidation.js";
import {
  customeVehicleSlection
  
} from "../controllers/customerControllers.js";
const router = express.Router();

router.get("/home", customerHome);
router.get("/serviceslist", servicesListing);
router.get("/addVehicle", vehicleController.getAddVehicle);
router.post("/addVehicle", vehicleValidator, vehicleController.addVehicle);
router.get("/home", customerHome);
router.get("/vehicleSelection", customeVehicleSlection);
router.get("/profile", customerProfile);

export default router;
