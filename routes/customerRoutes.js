import express from "express";
import {
  CustomerFeedback,
  appointment,
  selectServices,
  home,
  profile,
  addVehicles,
  customerVehicleSelection,
  slotDisplay,
  vehicles,
  vehiclesList,
  service,
  slot,
} from "../controllers/staticControllers.js";
import {
  addVehicle,
  getUserVehicle,
  getVehicleTypes,
} from "../controllers/vehicleControllers.js";

import {
  showAppointments,
  CustomerFeedbackPost,
  customerSlotSelection,
  getAllCustomers,
} from "../controllers/customerControllers.js";
import upload from "../helpers/fileUploads.js";
import {
  getGarages,
  getGarageListing,
  getSingleGarage,
} from "../controllers/garageControllers.js";

import { updateProfile } from "../controllers/userControllers.js";
import { servicesListing } from "../controllers/serviceControllers.js";
import { customerInvoice } from "../controllers/invoiceControllers.js";

const router = express.Router();

/// for rendering
router.get("/home", home);
router.get("/vehicle", vehicles);
router.get("/vehicleList", vehiclesList);
router.get("/service", service);
router.get("/slots", slot);

router.get("/vehicle/:id", getSingleGarage);
router.get("/addvehicle", addVehicles);
router.get("/garageList", getGarages);
router.get("/profile", profile);
router.get("/appointment", appointment);
router.get("/singleGarage", getSingleGarage);
router.get("/servicesList/:garageId", servicesListing);
router.get("/vehicleType", getVehicleTypes);
router.get("/viewVehicle/:type", getUserVehicle);
router.post("/addVehicle", addVehicle);

router.get("/services", selectServices);
router.post("/servicesList", servicesListing);
router.put("/profile/update", upload.single("thumbnail"), updateProfile);

router.get("/vehicleSelection", customerVehicleSelection);
router.get("/getCustomerName", getAllCustomers);
router.get("/slots", slotDisplay);
router.get("/getslots/:garageId/:date", customerSlotSelection);
router.get("/invoice/:appointmentId", customerInvoice);
router.get("/garages", getGarageListing);
router.get("/appointments", showAppointments);
router.get("/feedback", CustomerFeedback);
router.post("/feedback", CustomerFeedbackPost);
// router.post("");

export default router;
