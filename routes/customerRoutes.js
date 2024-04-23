import express from "express";
import {
  CustomerFeedback,
  appointment,
  selectServices
} from "../controllers/staticControllers.js";
import {getUserVehicle, addVehicle} from "../controllers/vehicleControllers.js";
import upload from "../helpers/fileUploads.js";

import {
  CustomerFeedbackPost,
  customerSlotSelection,
  getAllCustomers,
  showAppointments,
} from "../controllers/customerControllers.js";
import { home, profile, addVehicles, customerVehicleSelection, servicesPage, slotDisplay, vehicles } from "../controllers/staticControllers.js";
import { getGarages, getGarageListing, getSingleGarage } from "../controllers/garageControllers.js";
import { getServices } from "../utils/dbHandler.js";
import { servicesListing } from "../controllers/serviceControllers.js";



import { updateProfile } from "../controllers/userControllers.js";
import { customerInvoice } from "../controllers/invoiceControllers.js";
  
const router = express.Router();

router.get("/home", home);
router.get("/vehicle", vehicles);
router.get("/vehicle/:id", getSingleGarage);
router.get("/addvehicle", addVehicles);
router.get("/garageList",getGarages);
router.get("/service",getServices);
router.get("/profile", profile);
router.get("/appointment", appointment);
router.get("/singleGarage", getSingleGarage);

router.get("/servicesList", servicesListing);
router.get("/addVehicle/:type", getUserVehicle);
router.post("/addVehicle",addVehicle);
router.get("/services", selectServices);
router.post("/servicesList", servicesListing);
router.put("/profile/update", upload.single("thumbnail"), updateProfile);

router.get("/vehicleSelection", customerVehicleSelection);
router.get("/getCustomerName", getAllCustomers);
router.get("/slots", slotDisplay);
router.post("/getslots", customerSlotSelection);
router.get("/invoice/:appointmentId", customerInvoice)
router.get("/garages", getGarageListing);
router.get("/appointments", showAppointments)
router.get("/feedback",CustomerFeedback)
router.post("/feedback",CustomerFeedbackPost)

export default router;
