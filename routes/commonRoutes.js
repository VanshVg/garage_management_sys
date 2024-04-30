import express from "express";
import { logout } from "../controllers/staticControllers.js";
import { cityList, stateList } from "../controllers/addressControllers.js";
import { customerInvoice } from "../controllers/invoiceControllers.js";
import { getUserDetails } from "../controllers/userControllers.js";
import { allServices } from "../controllers/serviceControllers.js";

const router = express.Router();

router.get("/allServices", allServices);
router.get("/address/state", stateList);
router.get("/address/city/:stateId", cityList);
router.get("/logout", logout);
router.get("/userDetails", getUserDetails);
router.post("/generate/:appointmentId", customerInvoice);

export default router;
