import express from "express";
import {
  customerHome,
  servicesListing,
  customerProfile,
} from "../controllers/staticControllers.js";
import * as vehicleController from "../controllers/vehicleControllers.js";
import { vehicleValidator } from "../validators/vehicleValidation.js";
import {
  customerVehicleSelection,
  getAllCustomers,
} from "../controllers/customerControllers.js";
const router = express.Router();

router.get("/home", customerHome);
router.get("/servicesList", servicesListing);
router.get("/addVehicle/:type", vehicleController.getAddVehicle);
router.post("/addVehicle", vehicleValidator, vehicleController.addVehicle);
router.get("/vehicleSelection", customerVehicleSelection);
router.get("/getCustomerName", getAllCustomers);
router.get("/profile", customerProfile);

export default router;
