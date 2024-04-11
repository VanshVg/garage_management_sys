import express from 'express';
import {
  slotBooking,
  slotDelete,
  slotUpdate,
} from "../../controllers/slotBookingController.js";

const router = express.Router();

router.post('/insert', slotBooking)
router.post('/update', slotUpdate)
router.post('/delete', slotDelete)

export default router;