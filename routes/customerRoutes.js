import express from "express";
import {
  servicesListing,
  customerProfile,
  selectServices,
} from "../controllers/staticControllers.js";
import * as vehicleController from "../controllers/vehicleControllers.js";
import { vehicleValidator } from "../validators/vehicleValidation.js";
import {
  home, vehicles, addVehicles,
  customerSlotSelection,
  customerVehicleSelection,
  getAllCustomers,
  slotDisplay,
  CustomerFeedback,
  CustomerFeedbackPost
} from "../controllers/customerControllers.js";
import { getGarages, getGarageListing } from "../controllers/garageControllers.js";
const router = express.Router();

router.get("/home", home);
router.get("/vehicle", vehicles);
router.get("/addvehicle", addVehicles);
router.get("/garageList", getGarages);
router.get("/servicesList", servicesListing);
router.get("/services", selectServices);
router.post("/servicesList", servicesListing);
router.get("/addVehicle/:type", vehicleController.getAddVehicle);
router.get("/vehicleSelection", customerVehicleSelection);
router.get("/getCustomerName", getAllCustomers);
router.get("/profile", customerProfile);
router.get("/slots", slotDisplay);
router.post("/getslots", customerSlotSelection);
router.get("/feedback", CustomerFeedback)
router.get("/garages", getGarageListing);
router.post("/feedback", CustomerFeedbackPost);
router.post("/getSlots", customerSlotSelection);

export default router;
