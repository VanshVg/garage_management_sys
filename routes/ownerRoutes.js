import express from "express";
import {
  appointments,
  calendar,
  dashboard,
  employee,
  getAllCustomers,
  inventory,
  invoice,
  tasks,
} from "../controllers/staticControllers.js";
import garageRoutes from "./owner/garageRoutes.js";
import slotRoutes from "./owner/slotRoutes.js";
import profileRoutes from "./owner/profileRoutes.js";
import serviceRoutes from "./owner/serviceRoutes.js";
import { findOwnerService } from "../controllers/serviceControllers.js";
import {
  appointmentsListing,
  bookedAppointments,
  getAppointmentCount,
  updateAppointment,
  notification,
} from "../controllers/appointmentsController.js";
import { daysCount } from "../controllers/userControllers.js";
import { generateRevenue } from "../controllers/paymentControllers.js";
import {
  changeVehicleStatus,
  getVehicleStatus,
} from "../controllers/tasksControllers.js";

const router = express.Router();

// calendar
router.use("/calendar", calendar);

// slot routes
router.use("/slots", slotRoutes);

// service routes
router.use("/services", serviceRoutes);

// home page
router.get("/home", dashboard);

// garage routes
router.use("/garages", garageRoutes);

// profile routes
router.use("/profile", profileRoutes);

router.get("/appointment", appointments);

router.get("/appointmentsList", appointmentsListing);
router.get("/appointmentsList/:garageId", appointmentsListing);
router.get("/bookedAppointments/:id", bookedAppointments);
router.post("/updateAppointment", updateAppointment);

router.get("/inventory", inventory);

router.get("/employee", employee);

router.get("/tasks", tasks);

router.get("/invoice", invoice);

router.get("/appointmentCount", getAppointmentCount);

router.get("/notification", notification);

router.post("/ownerServices", findOwnerService);

router.get("/getCustomerList", getAllCustomers);

router.get("/daysCount", daysCount);

router.get("/revenueCount", generateRevenue);
router.get("/vehicleStatus/:garageId", getVehicleStatus);
router.put("/vehicleStatus/:appointmentId", changeVehicleStatus);

export default router;
