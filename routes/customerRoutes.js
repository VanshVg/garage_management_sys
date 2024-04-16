import express from 'express';
import { customerHome, servicesListing } from '../controllers/staticControllers.js';
const router = express.Router();

router.get('/home', customerHome);
router.get('/serviceslist', servicesListing);

export default router;