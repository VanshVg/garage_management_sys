import express from 'express';
import {
  slotBooking,
  slotDelete,
  slotUpdate,
} from "../../controllers/slotBookingController.js";
import { slots } from '../../controllers/staticControllers.js';

const router = express.Router();

router.get('/', slots);
router.post('/insert', slotBooking)
router.post('/update', slotUpdate)
router.post('/delete', slotDelete)

export default router;