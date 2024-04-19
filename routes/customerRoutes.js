import express from "express";
import {
  customerHome,
  servicesListing,
  customerProfile,
} from "../controllers/staticControllers.js";
import * as vehicleController from "../controllers/vehicleControllers.js";
import { vehicleValidator } from "../validators/vehicleValidation.js";
import {
  customerSlotSelection,
  customerVehicleSelection,
  getAllCustomers,
  slotDisplay,
} from "../controllers/customerControllers.js";
import {  getGarageListing } from "../controllers/garageControllers.js";
import { customerInvoice, downloadCustomerInvoice } from "../controllers/invoiceControllers.js";
const router = express.Router();

router.get("/home", customerHome);
router.get("/servicesList", servicesListing);
router.get("/addVehicle/:type", vehicleController.getAddVehicle);
router.post("/addVehicle", vehicleValidator, vehicleController.addVehicle);
router.get("/vehicleSelection", customerVehicleSelection);
router.get("/getCustomerName", getAllCustomers);
router.get("/profile", customerProfile);
router.get("/slots", slotDisplay);
router.post("/getslots", customerSlotSelection);
router.get("/downloadInvoice", downloadCustomerInvoice);
router.get("/invoice/:appointmentId", customerInvoice);
router.get("/garages",getGarageListing);

export default router;
