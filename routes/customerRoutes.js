import express from 'express';
import { customerHome } from '../controllers/staticControllers.js';
import { customeVehicleSlection, getAllCustomers } from '../controllers/customerControllers.js';
const router = express.Router();

router.get('/home', customerHome);
router.get('/vehicleSelection',customeVehicleSlection)
router.get("/getCustomerName",getAllCustomers)
export default router;