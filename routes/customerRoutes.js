import express from "express";
import {
  CustomerFeedback,
  appointment,
  home,
  profile,
  addVehicles,
  customerVehicleSelection,
  vehicles,
  vehiclesList,
  service,
  slot,
  payment,
} from "../controllers/staticControllers.js";
import {
  addVehicle,
  getAllUserVehicles,
  getUserVehicle,
  getUserVehicleDetails,
  getVehicleTypes,
  updateUserVehicle,
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
import {
  bookAppointment,
  customerNotification,
} from "../controllers/appointmentsController.js";
import {
  addPaymentDetails,
  getPaymentDetails
} from "../controllers/paymentControllers.js";

const router = express.Router();

/// for rendering
router.get("/home", home);
router.get("/vehicle", vehicles);
router.get("/vehicleList", vehiclesList);
router.get("/service", service);
router.get("/slots", slot);
router.get("/payment", payment);

router.get("/vehicle/:id", getSingleGarage);
router.get("/addvehicle", addVehicles);
router.get("/garageList/:dist?/:lat?/:long?", getGarages);
router.get("/profile", profile);
router.get("/appointment", appointment);
router.get("/singleGarage", getSingleGarage);
router.get("/servicesList/:garageId", servicesListing);
router.get("/vehicleType", getVehicleTypes);
router.get("/viewVehicle/:type", getUserVehicle);
router.get("/viewVehicles", getAllUserVehicles);
router.post("/addVehicle", upload.single("vehicleImage"), addVehicle);
router.post("/updateVehicle", upload.single("vehicleImage"), updateUserVehicle);

router.post("/servicesList", servicesListing);
router.put("/profile/update", upload.single("thumbnail"), updateProfile);

router.get("/fetchVehicleDetails/:id", getUserVehicleDetails);
router.get("/vehicleSelection", customerVehicleSelection);
router.get("/getCustomerName", getAllCustomers);
router.get("/getslots/:garageId/:date", customerSlotSelection);
router.get("/invoice/:appointmentId", customerInvoice);
router.get("/garages", getGarageListing);

router.get("/notification", customerNotification);
router.get("/appointments", showAppointments);
router.get("/feedback", CustomerFeedback);
router.post("/feedback", CustomerFeedbackPost);
router.post("/bookAppointment", bookAppointment);
router.get("/payment/:appointmentId", getPaymentDetails);
router.post("/payment/:appointmentId", addPaymentDetails);

// router.post("");

export default router;
