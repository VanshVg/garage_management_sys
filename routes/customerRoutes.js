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
  appointment,
  getServices,
  showAppointments
} from "../controllers/customerControllers.js";
import { getGarages, getGarageListing, getSingleGarage } from "../controllers/garageControllers.js";
  
import { customerInvoice, downloadInvoice } from "../controllers/invoiceControllers.js";
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
router.get("/invoice/:appointmentId", customerInvoice)
router.get("/garages",getGarageListing);
router.get("/appointments", showAppointments)
router.get("/downloadInvoice/:appointmentId", downloadInvoice)

export default router;
