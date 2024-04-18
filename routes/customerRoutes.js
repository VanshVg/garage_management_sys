import express from "express";
import {
  servicesListing,
  customerProfile,
} from "../controllers/staticControllers.js";
import * as vehicleController from "../controllers/vehicleControllers.js";
import { vehicleValidator } from "../validators/vehicleValidation.js";
import {
  home, vehicles, addVehicles,
  customerSlotSelection,
  customerVehicleSelection,
  getAllCustomers,
  slotDisplay,
} from "../controllers/customerControllers.js";
import { getGarages } from "../controllers/garageControllers.js";

const router = express.Router();

router.get("/home", home);
router.get("/vehicle", vehicles);
router.get("/addvehicle", addVehicles);
router.get("/garageList",getGarages);

router.get("/servicesList", servicesListing);
router.get("/addVehicle/:type", vehicleController.getAddVehicle);
router.post("/addVehicle", vehicleValidator, vehicleController.addVehicle);
router.get("/vehicleSelection", customerVehicleSelection);
router.get("/getCustomerName", getAllCustomers);
router.get("/profile", customerProfile);
router.get("/slots", slotDisplay);
router.post("/getslots", customerSlotSelection);


export default router;
