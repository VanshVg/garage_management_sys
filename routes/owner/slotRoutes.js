import express from 'express';
import {
  getSlots,
  slotBooking,
  slotDelete,
  slotUpdate,
} from "../../controllers/slotBookingController.js";
import { slots } from '../../controllers/staticControllers.js';
import { paginationMiddleware } from '../../helpers/pagination.js';

const router = express.Router();

router.get('/', slots);
router.get('/getAllSlots', paginationMiddleware(10), getSlots)
router.post('/insert', slotBooking)
router.post('/update', slotUpdate)
router.post('/delete', slotDelete)

export default router;
