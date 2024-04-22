import express from "express";
import { addPaymentDetails, getPaymentDetails } from "../controllers/paymentControllers.js";


const router = express.Router();

router.get("/:appointmentId", getPaymentDetails);
router.post("/:appointmentId", addPaymentDetails);

export default router;