import express from "express";
import {
  CustomerFeedback,
   appointment,
  selectServices,
} from "../controllers/staticControllers.js";
import {
  getVehicleTypes,
} from "../controllers/vehicleControllers.js";

import {
  home,
  vehicles,
  addVehicles,
  profile
} from "../controllers/staticControllers.js";

import {
  getUserVehicle,
  addVehicle,
} from "../controllers/vehicleControllers.js";
import upload from "../helpers/fileUploads.js";

import {
  customerSlotSelection,
  getAllCustomers,
  
   CustomerFeedbackPost,
  // getServices,
  showAppointments
  
} from "../controllers/customerControllers.js";
import {
  getGarages,
  getGarageListing,
  getSingleGarage,
} from "../controllers/garageControllers.js";
import {
  customerVehicleSelection,
  servicesPage,
  slotDisplay
} from "../controllers/staticControllers.js";


import { servicesListing } from "../controllers/serviceControllers.js";

import { updateProfile } from "../controllers/userControllers.js";
import { customerInvoice } from "../controllers/invoiceControllers.js";
import { getServices } from "../utils/dbHandler.js";

const router = express.Router();

router.get("/home", home);
router.get("/vehicle", vehicles);
router.get("/vehicle/:id", getSingleGarage);
router.get("/addvehicle", addVehicles);
router.get("/garageList", getGarages);
router.get("/service", getServices);
router.get("/profile", profile);
router.get("/appointment", appointment);
router.get("/singleGarage", getSingleGarage);
router.get("/servicesList/:garageId", servicesListing);
router.get("/addVehicle/:type", getUserVehicle);
router.get("/vehicleType", getVehicleTypes);
router.post("/addVehicle", addVehicle);

router.get("/services", selectServices);
router.post("/servicesList", servicesListing);
router.put("/profile/update", upload.single("thumbnail"), updateProfile);

router.get("/vehicleSelection", customerVehicleSelection);
router.get("/getCustomerName", getAllCustomers);
router.get("/slots", slotDisplay);
router.post("/getslots", customerSlotSelection);
router.get("/invoice/:appointmentId", customerInvoice);
router.get("/garages", getGarageListing);
router.get("/appointments", showAppointments);
router.get("/feedback", CustomerFeedback);
router.post("/feedback", CustomerFeedbackPost);

export default router;
