import express from "express";
import { getPaymentDetails } from "../controllers/paymentControllers.js";


const router = express.Router();

router.get("/:appointmentId", getPaymentDetails);

export default router;