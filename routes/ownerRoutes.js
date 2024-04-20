import express from "express";
import {
  appointments,
  appointmentsListing,
  bookedAppointments,
  calendar,
  daysCount,
  findOwnerService,
  getAllCustomers,
  getAppointmentCount,
  home,
  inventory,
  invoice
} from "../controllers/staticControllers.js";
import garageRoutes from "./owner/garageRoutes.js";
import slotRoutes from "./owner/slotRoutes.js";
import profileRoutes from "./owner/profileRoutes.js";
import serviceRoutes from "./owner/serviceRoutes.js";


const router = express.Router();

// calendar
router.use("/calendar", calendar);

// slot routes
router.use("/slots", slotRoutes);

// service routes
router.use("/services", serviceRoutes);

// home page
router.get("/home", home);

// garage routes
router.use("/garages", garageRoutes);

// profile routes
router.use("/profile", profileRoutes);

router.get("/appointment", appointments);

router.get('/appointmentsList', appointmentsListing);
router.get('/appointmentsList/:garageId', appointmentsListing);
router.get('/bookedAppointments/:id', bookedAppointments);

router.get("/inventory", inventory);

router.get("/invoice", invoice);

router.get("/appointmentCount", getAppointmentCount);

router.post("/ownerServices", findOwnerService);

router.get("/getCustomerList", getAllCustomers);

router.get('/daysCount', daysCount)

export default router;
