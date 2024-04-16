import express from "express";
import {
  customeVehicleSlection,
  getAllCustomers,
} from "../controllers/customerControllers.js";
import {
  customerHome,
  customerProfile,
} from "../controllers/staticControllers.js";
const router = express.Router();

router.get("/home", customerHome);
router.get("/vehicleSelection", customeVehicleSlection);
router.get("/getCustomerName", getAllCustomers);
router.get("/profile", customerProfile);

export default router;
