import express from "express";
import {
  servicesListing,
  selectServices,
} from "../controllers/staticControllers.js";
import * as vehicleController from "../controllers/vehicleControllers.js";
import {
  home, vehicles, addVehicles, profile,
  customerSlotSelection,
  customerVehicleSelection,
  getAllCustomers,
  slotDisplay,
  CustomerFeedback,
  CustomerFeedbackPost,
  customerInvoice,
  appointment,
  getServices
} from "../controllers/customerControllers.js";
import { getGarages, getGarageListing, getSingleGarage } from "../controllers/garageControllers.js";
const router = express.Router();

router.get("/home", home);
router.get("/vehicle", vehicles);
router.get("/vehicle/:id",getSingleGarage);
router.get("/addvehicle", addVehicles);
router.get("/garageList",getGarages);
router.get("/service",getServices);
router.get("/profile", profile);
router.get("/appointment",appointment);
router.get("/singleGarage",getSingleGarage);

router.get("/servicesList", servicesListing);

router.get("/services", selectServices);
router.post("/servicesList", servicesListing);
router.get("/addVehicle/:type", vehicleController.getAddVehicle);
router.get("/vehicleSelection", customerVehicleSelection);
router.get("/getCustomerName", getAllCustomers);
router.get("/slots", slotDisplay);
router.post("/getslots", customerSlotSelection);
router.get("/feedback", CustomerFeedback)
router.get("/garages", getGarageListing);
router.post("/feedback", CustomerFeedbackPost);
router.get("/invoice", customerInvoice);

export default router;
