import express from "express";
import {
  customerHome,
  servicesListing,
  customerProfile,
  selectServices,
} from "../controllers/staticControllers.js";
import * as vehicleController from "../controllers/vehicleControllers.js";
import { vehicleValidator } from "../validators/vehicleValidation.js";
import {
  customerSlotSelection,
  customerVehicleSelection,
  getAllCustomers,
  slotDisplay,
} from "../controllers/customerControllers.js";
import { getGarageListing } from "../controllers/garageControllers.js";
const router = express.Router();

router.get("/home", customerHome);
router.get("/services", selectServices);
router.post("/servicesList", servicesListing);
router.get("/addVehicle/:type", vehicleController.getAddVehicle);
router.post("/addVehicle", vehicleValidator, vehicleController.addVehicle);
router.get("/vehicleSelection", customerVehicleSelection);
router.get("/getCustomerName", getAllCustomers);
router.get("/profile", customerProfile);
router.get("/slots", slotDisplay);
router.post("/getslots", customerSlotSelection);

router.get("/garages", getGarageListing);

export default router;
