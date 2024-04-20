import express from "express";
import { customerInvoice } from "../controllers/invoiceControllers.js";

const router = express.Router();

router.post("/generate/:appointmentId", customerInvoice);

export default router;